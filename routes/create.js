const express = require('express');
const create = require('../controllers/create');
const router = express.Router();
const createController = require('../controllers/create');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, createController.getIndex);

module.exports = router;