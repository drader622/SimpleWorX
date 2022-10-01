const User = require('../models/User');

module.exports = {
    getIndex: (req, res) => {
        res.render('account.ejs', { user: req.user });
    },
    updateInfo: async (req, res) => {
        await User.updateOne({ _id: req.user._id }, {
            $set: {
                firstName: req.body.firstName,
            }
        }, {
            sort: { _id: -1 },
            upsert: true
        })
        res.redirect('/account');
    }
}