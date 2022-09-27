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
            console.log(req.params.woNum)
            res.render('../views/woInfo.ejs', { user: req.user })
            // const workOrders = await WorkOrder.find();
            // workOrders.forEach(workOrder => {
            //     if (workOrder.workOrderNum === req.params.woNum) {
            //         res.json(workOrder);
            //     }
            // });
        } catch (err) {
            console.log(err);
        }
    },
    respondToWorkOrder: async (req, res) => {
        try {
            await WorkOrder.updateOne({ workOrderNum: req.params.num }, {
                $set: {
                    respondedTo: true,
                    resEmp: req.body.resEmp,
                    resEmpTitle: req.body.resEmpTitle,
                    resDate: req.body.resDate,
                    resTime: req.body.resTime
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            });
            res.json('')
        } catch (err) {
            console.log(err);
        }
    },
    closeWorkOrder: async (req, res) => {
        try {
            await WorkOrder.updateOne({ workOrderNum: req.params.num }, {
                $set: {
                    status: 'closed',
                    solutionDetail: req.body.solDetail
                }
            }, {
                sort: { _id: -1 },
                upsert: true
            });
            res.json('');
        } catch (err) {
            console.log(err);
        }
    },
    createWorkOrder: async (req, res) => {
        try {
            let workOrderNum;
            workOrderNum = await setWONum();
            WorkOrder.create({
                workOrderNum: workOrderNum,
                status: 'open',
                respondedTo: false,
                reqEmp: req.body.reqEmp,
                reqEmpTitle: req.body.reqEmpTitle,
                reqDate: req.body.reqDate,
                reqTime: req.body.reqTime,
                mod: req.body.mod,
                mach: req.body.mach,
                machNum: req.body.machNum,
                reqDept: req.body.reqDept,
                probDetail: req.body.probDetail,
                resEmp: '',
                resEmpTitle: '',
                resDate: '',
                resTime: '',
                solutionDetail: '',
                userId: req.user._id
            })
            res.json(workOrderNum);
        } catch (err) {
            console.log(err);
        }
    },
    deleteWorkOrder: async (req, res) => {
        try {
            await WorkOrder.findOneAndDelete({ workOrderNum: req.params.num });
            res.json('')
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