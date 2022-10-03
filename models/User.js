const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: { type: String, },
  lastName: { type: String, },
  image: { type: String, default: '/images/newUser.png' },
  cloudinaryId: { type: String },
  title: { type: String,},
  department: { type: String },
  directReport: { type: mongoose.Schema.Types.ObjectId },
  userName: { type: String, },
  email: { type: String, },
  password: String,
  phone: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  compensation: { type: String },
  supervisor: { type: String },
  crew: { type: String },
  compensation: { type: String, default: '00.00' },
})


// Password hash middleware.

UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


module.exports = mongoose.model('User', UserSchema)
