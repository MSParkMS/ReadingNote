const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login.ejs');
});

router.post('/', loginController.login);

module.exports = router;