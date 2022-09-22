const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');

router.get('/', teamController.getIndex);

module.exports = router;