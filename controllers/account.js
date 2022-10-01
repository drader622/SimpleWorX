const cloudinary = require("../middleware/cloudinary");
const User = require('../models/User');

module.exports = {
    getIndex: (req, res) => {
        res.render('account.ejs', { user: req.user });
    },
    updateInfo: async (req, res) => {
        try {
            await User.updateOne({ _id: req.user._id }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    streetAddress: req.body.streetAddress,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            })
            res.redirect('/account');
        } catch (err) {
            console.log(err);
        }
    },
    updateImage: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            await User.updateOne({ _id: req.user._id }, {
                $set: {
                    image: result.secure_url,
                    cloudinaryId: result.public_id,
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            })
            res.redirect('/account');
        } catch (err) {
            console.log(err);
        }

    },
    updateEmploymentInfo: async (req, res) => {
        try {
            await User.updateOne({ _id: req.user._id }, {
                $set: {
                    title: req.body.title,
                    compensation: req.body.compensation,
                    supervisor: req.body.supervisor,
                    crew: req.body.crew,
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            })
            res.redirect('/account');
        } catch (err) {
            console.log(err);
        }

    }
}