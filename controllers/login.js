const mongoose = require('mongoose');
const User = require('../models/user');

exports.login = (req, res) => {
  User.findOne({'id' : req.body.user_id, 'pw': req.body.user_pw}).exec()
    .then((document) => {
      if (document) {
        req.session.user = {id: document.id, nickname: document.nickname};
        res.redirect('/home');
      } else {
        res.render('error.ejs', { str: 'ID / PW가 잘못되었습니다.' });
        return;
      }
    })
    .catch((err) => {
      if (err) {
        res.render('error.ejs', err);
        return;
      }
    });
}