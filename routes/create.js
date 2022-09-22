const express = require('express');
const create = require('../controllers/create');
const router = express.Router();
const createController = require('../controllers/create');

router.get('/', createController.getIndex);

module.exports = router;