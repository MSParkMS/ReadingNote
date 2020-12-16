const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home.ejs', { nickname: req.session.user.nickname });
});

module.exports = router;