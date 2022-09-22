const express = require('express');
const router = express.Router();
const WorkOrder = require('../models/workOrder');

router.get('/', (req, res) => {
    WorkOrder.find({}, (err, workOrders) => {
        if (err) res.send(err);
        res.render('workOrders.ejs', { workOrders: workOrders, });
    });
});

router.get(`/getRequests`, (req, res) => {
    WorkOrder.find({}, (err, workOrders) => {
        if (err) res.send(err);
        res.json(workOrders);
    });
});

router.get('/getWoInfo/:woNum', (req, res) => {
    WorkOrder.find({}, (err, workOrders) => {
        if (err) res.send(err)
        workOrders.forEach(workOrder => {
            if (workOrder.workOrderNum === req.params.woNum) {
                res.json(workOrder);
            }
        });
    });
});

router.put('/respondToWorkOder/:num', (req, res) => {
    WorkOrder.updateOne({ workOrderNum: req.params.num }, {
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
    }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        res.json('')
    });
});

router.put('/closeWorkOrder/:num', (req, res) => {
    WorkOrder.updateOne({ workOrderNum: req.params.num }, {
        $set: {
            status: 'closed',
            solutionDetail: req.body.solDetail
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        res.json('')
    });
});

router.post('/postWorkOrder', (req, res) => {
    try {
        let workOrderNum;
        workOrderNum = setWONum();
        const newWorkOrder = new WorkOrder({
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
            solutionDetail: ''
        });
        newWorkOrder.save();
        res.json(workOrderNum);
    }
    catch (err) {
        console.log(err);
    }
});

router.delete('/deleteWorkOrder/:num', (req, res) => {
    WorkOrder.deleteOne({ workOrderNum: req.params.num }, (err, workOrders) => {
        if (err) res.send(err);

        res.json(workOrders);
    });
});

function setWONum() {
    let num = 0;
    num = Math.ceil(Math.random() * 999);
    num = ("0000" + num).slice(-6);
    return num;
}


module.exports = router;