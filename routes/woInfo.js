const express = require('express');
const router = express.Router();
const woInfoController = require('../controllers/woInfo');
const { ensureAuth } = require('../middleware/auth');

router.get('/:id', ensureAuth, woInfoController.getWorkOrder);

module.exports = router;