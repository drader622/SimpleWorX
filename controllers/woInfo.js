const WorkOrder = require('../models/workOrder');

module.exports = {
    getWorkOrder: async (req, res) => {
        try {
            const workOrder = await WorkOrder.findById(req.params.id);
            console.log(workOrder);
            res.render('woInfo.ejs', { user: req.user, workOrder: workOrder });
        } catch (err) {
            console.log(err);
        }
    }
}