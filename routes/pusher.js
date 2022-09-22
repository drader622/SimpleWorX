const express = require('express');
const router = express.Router();
const pusherController = require('../controllers/pusher')

router.post('/', pusherController.trigger);

module.exports = router;