const mongoose = require('mongoose');
const WorkOrderSchema = new mongoose.Schema({
    workOrderNum: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    respondedTo: {
        type: Boolean,
        required: true
    },
    reqEmp: {
        type: String,
        required: true
    },
    reqEmpTitle: {
        type: String,
        required: true
    },
    reqDate: {
        type: String,
    },
    reqLocation: {
        type: String,
        required: true
    },
    reqDept: {
        type: String,
        required: true
    },
    probDetail: {
        type: String,
        required: true
    },
    resEmp: {
        type: String,
    },
    resEmpTitle: {
        type: String,
    },
    resDate: {
        type: String,
    },
    resTime: {
        type: String,
    },
    solutionDetail: {
        type: String,
    },
    userId: {
        type: String,
    },
},
    {
        collection: 'request'
    }
);

const WorkOrder = mongoose.model('workOrders', WorkOrderSchema, 'request');

module.exports = WorkOrder;