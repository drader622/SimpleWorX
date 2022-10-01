const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, accountController.getIndex);
router.put('/updateInfo', accountController.updateInfo);

module.exports = router;