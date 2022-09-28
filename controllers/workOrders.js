const WorkOrder = require('../models/workOrder');

module.exports = {
    getIndex: async (req, res) => {
        try {
            const workOrders = await WorkOrder.find();
            res.render('workOrders.ejs', { workOrders: workOrders, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },
    getRequests: async (req, res) => {
        try {
            const workOrders = await WorkOrder.find();
            res.json(workOrders);
        } catch (err) {
            console.log(err);
        }
    },
    getWorkOderInfo: async (req, res) => {
        try {
            const workOrders = await WorkOrder.find();
            res.render('../views/woInfo.ejs', { user: req.user })
        } catch (err) {
            console.log(err);
        }
    },
    respondToWorkOrder: async (req, res) => {
        try {
            console.log(req.user)
            let date = new Date;
            await WorkOrder.updateOne({ _id: req.params.id }, {
                $set: {
                    respondedTo: true,
                    resEmp: `${req.user.firstName} ${req.user.lastName}`,
                    resEmpTitle: req.user.title,
                    resDate:  `${date.toDateString()} @ ${date.toLocaleTimeString()}`,
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            });
            res.redirect(`/woInfo/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    closeWorkOrder: async (req, res) => {
        try {
            await WorkOrder.updateOne({ _id: req.params.id }, {
                $set: {
                    status: 'closed',
                    solutionDetail: req.body.solDetail
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            });
            res.redirect(`/woInfo/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    createWorkOrder: async (req, res) => {
        try {
            let workOrderNum = await setWONum();
        
            let reqLocation = `${req.body.machine} ${(req.body.module).slice(-1)}${req.body.machNum}`;
            let date = new Date;
            await WorkOrder.create({
                workOrderNum: workOrderNum,
                status: 'open',
                respondedTo: false,
                reqEmp: `${req.user.firstName} ${req.user.lastName}`,
                reqEmpTitle: req.user.title,
                reqLocation: reqLocation,
                reqDept: req.body.shop,
                probDetail: req.body.probDetail,
                reqDate: `${date.toDateString()} @ ${date.toLocaleTimeString()}`,
                userId: req.user._id
            });
            res.redirect('/workOrders');
        } catch (err) {
            console.log(err);
        }
    },
    deleteWorkOrder: async (req, res) => {
        try {
            // Delete post from db
            await WorkOrder.deleteOne({ _id: req.params.id });
            console.log("Deleted Post");

            res.redirect('/workOrders');
        } catch (err) {
            console.log(err);
        }
    }
}

function setWONum() {
    let num = 0;
    num = Math.ceil(Math.random() * 999);
    num = ("0000" + num).slice(-6);
    return num;
}