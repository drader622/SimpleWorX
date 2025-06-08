const cloudinary = require("../middleware/cloudinary");
const User = require('../models/User');
const Department = require('../models/Department')

module.exports = {
    getIndex: async (req, res) => {
        const department = await Department.find({ deptName: req.user.department });
        const depts = await Department.find();
        let bossData;
        bossData = await User.find({ _id: req.user.directReport })
        console.log(req.user.directReport);
        res.render('account.ejs', {
            user: req.user,
            depts: depts,
            deptTitles: department[0].deptTitles,
            bossName: `${bossData[0].firstName} ${bossData[0].lastName}`
        });
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
            let empTitle = req.body.title[1];
            if (empTitle === '') { empTitle = req.body.title[1] };

            let empCrew = req.body.crew[0];
            if (empCrew === '') { empCrew = req.body.crew[1] };

            let department = req.body.department[1];

            await User.updateOne({ _id: req.user._id }, {
                $set: {
                    department: req.body.department[1],
                    title: empTitle,
                    compensation: req.body.compensation,
                    crew: empCrew,
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            });
            if (empTitle === 'Supervisor') {
                const bossData = await User.find({ department: req.body.department[1], title: 'Manager' });

                await User.updateOne({ _id: req.user._id }, {
                    $set: {
                        directReport: bossData[0]._id
                    }
                })
            } else if (empTitle === 'Manager') {
                await User.updateMany({ department: req.body.department, title: 'Supervisor' }, {
                    $set: {
                        directReport: req.user._id
                    }
                })
            }
            res.redirect('/account');
        } catch (err) {
            console.log(err);
        }

    }
}