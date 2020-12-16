const express = require('express');
const logoutController = require('../controllers/logout');
const router = express.Router();

router.get('/', logoutController.logout);

module.exports = router;