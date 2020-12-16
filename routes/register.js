const express = require('express');
const registerController = require('../controllers/register');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register.ejs');
});

router.post('/', registerController.register);

module.exports = router;