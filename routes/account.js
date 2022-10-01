const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const accountController = require('../controllers/account');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, accountController.getIndex);
router.put('/updatePersonalInfo', accountController.updateInfo);
router.put('/updateImage', upload.single("file"), accountController.updateImage);
router.put('/updateEmploymentInfo', accountController.updateEmploymentInfo);

module.exports = router;