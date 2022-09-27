const express = require('express');
const router = express.Router();
const woInfoController = require('../controllers/woInfo');
const { ensureAuth } = require('../middleware/auth');

router.get('/', woInfoController.getIndex);

module.exports = router;