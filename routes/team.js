const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, teamController.getIndex);
// router.get('/getUser/:name', teamController.getUser);

module.exports = router;