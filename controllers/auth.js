const cloudinary = require("../middleware/cloudinary");
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');
const Department = require('../models/Department')

const currentUser = '';

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/workOrders')
  }
  res.render('login', {
    title: 'Login',
    user: req.user
  })
}

exports.postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect(req.session.returnTo || '/workOrders')
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  })
}

exports.getForgotPassword = async (req, res) => {
  if (req.user) {
    return res.redirect('/workOrders')
  }
  res.render('forgot', {
    title: 'Forgot Password',
    user: req.user,
    userFound: false,
  })
}

exports.postNewPassword = async (req, res, next) => {
  await User.findOne({ email: req.params.email.toLowerCase() }, (err, user) => {
    if (user) {
      const currUser = user;
      console.log(`current password: ${currUser.password}`);
      currUser.password = req.body.password;
      currUser.hashNewPassword((err, newPassword) => {
        currUser.password = newPassword;
        console.log(`new password: ${currUser.password}`)

        updateUser(currUser);

        req.logIn(currUser, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/workOrders')
        })
      })
    }
  })

}

exports.getFindUser = async (req, res) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (user) {
      console.log(user);
      res.render('forgot', {
        title: 'Forgot Password',
        user: req.user,
        userFound: true,
        email: user.email,
      })
    } else {
      validationErrors.push({ msg: 'No account found with that email address.' })
    }
    if (validationErrors.length) {
      req.flash('errors', validationErrors);
      res.render('forgot', {
        title: 'Forgot Password',
        user: req.user,
        userFound: false,
        email: '',
      })
    }
  });
}

exports.getSignup = async (req, res) => {
  const departments = await Department.find();
  if (req.user) {
    return res.redirect('/workOrders')
  }
  res.render('signup', {
    title: 'Create Account',
    user: req.user,
    departments: departments,
  })
}

exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('../signup');
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  const bossData = await User.find({ department: req.body.department, title: 'Supervisor' });

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    department: req.body.department,
    directReport: bossData[0]._id,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  User.findOne({
    $or: [
      { email: req.body.email },
      { userName: req.body.userName }
    ]
  }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address or username already exists.' })
      return res.redirect('../signup')
    }
    user.save((err) => {
      if (err) { return next(err) }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/account')
      })
    })
  })
}

updateUser = async (req, res) => {
  await User.updateOne({ _id: req.id }, {
    $set: {
      password: req.password,
    }
  }, {
    sort: { _id: -1 },
    upsert: true
  });
}