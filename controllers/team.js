const User = require('../models/User');
const Department = require('../models/Department');

module.exports = {
    getIndex: async (req, res) => {
        const bossData = await User.find({ _id: req.user.directReport });
        console.log(req.user.title);
        res.render('team.ejs', {
            user: req.user,
            bossData: bossData[0],
        });
    }
}