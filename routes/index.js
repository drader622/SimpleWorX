const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require('../controllers/auth');
const indexController = require('../controllers/index');
const teamController = require('../controllers/team');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//login page
router.get('/', indexController.getIndex);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', upload.single("file"), authController.postSignup);
router.get('/forgotPassword', authController.getForgotPassword);
router.post('/forgotPassword/:email', authController.postNewPassword);
router.post('/getUser', authController.getFindUser);
router.get('/getUser/:name', teamController.getUser);

module.exports = router;