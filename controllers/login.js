const mongoose = require('mongoose');
const User = require('../models/user');

exports.login = (req, res) => {
  User.findOne({'id' : req.body.user_id, 'pw': req.body.user_pw}).exec()
    .then((document) => {
      if (document) {
        req.session.user = {id: document.id, nickname: document.nickname};
        res.redirect('/home');
      } else {
        const error = {
          str: 'ID / PW가 잘못되었습니다.',
          goback: {
            str: '다시 로그인 하기',
            link: '/login'
          }
        }
        res.render('error.ejs', error);
      }
    })
    .catch((err) => {
      res.render('error.ejs', err);
    });
}