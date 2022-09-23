const express = require('express');
const router = express.Router();
const workOrderController = require('../controllers/workOrders');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, workOrderController.getIndex);

router.get(`/getRequests`, workOrderController.getRequests);

router.get('/getWoInfo/:woNum', workOrderController.getWorkOderInfo);

router.put('/respondToWorkOder/:num', workOrderController.respondToWorkOrder);

router.put('/closeWorkOrder/:num', workOrderController.closeWorkOrder);

router.post('/createWorkOrder', workOrderController.createWorkOrder);

router.delete('/deleteWorkOrder/:num', workOrderController.deleteWorkOrder);

module.exports = router;