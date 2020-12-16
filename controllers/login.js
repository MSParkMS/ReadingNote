const mongoose = require('mongoose');
const User = require('../models/user');

exports.login = (req, res) => {
  User.findOne({'id' : req.body.user_id, 'pw': req.body.user_pw}, (err, document) => {
    if (err) {
      res.render('error.ejs', {str: 'DB 에러발생' });
      return;
    }

    if (document) {
      req.session.user = {id: document.id, nickname: document.nickname};
      res.redirect('/home');
    } else {
      res.render('error.ejs', { str: 'ID / PW가 잘못되었습니다.' });
      return;
    }
  });
}