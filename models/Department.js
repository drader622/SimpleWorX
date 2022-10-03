const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    deptName: {
        type: String,
        required: true
    },
    deptTitles: {
        type: Array,
    }
},
);

const Department = mongoose.model('departments', DepartmentSchema);

module.exports = Department;