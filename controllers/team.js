const User = require('../models/User');
const Department = require('../models/Department');

module.exports = {
    getIndex: async (req, res) => {
        const bossData = await User.find({ _id: req.user.directReport });
        const deptEmployees = await User.find({ department: req.user.department });
        res.render('team.ejs', {
            user: req.user,
            bossData: bossData[0],
            deptEmployees: deptEmployees,
        });
    },

    getUser: async (req, res) => {
        let names = req.params.name.split(" ");
        const user = await User.findOne({ firstName: names[0], lastName: names[1] })

        res.json(user);
    }
}