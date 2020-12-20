const mongoose = require('mongoose');
const User = require('../models/user');

exports.register = (req, res) => {
  if (req.body.user_id.length <= 0 ||
      req.body.user_pw.length <=0 ||
      req.body.user_nickname.length <= 0) {
    const error = {
      str: 'ID / PW / 닉네임이 올바르지 않습니다.',
      goback : {
        link: '/register',
        str: '다시 입력하기'
      }
    };
    res.render('error.ejs', error);
    return;
  }

  User.findOne({'id' : req.body.user_id}).exec()
    .then((user) => {
      if (user) {
        const error = {
          str: '이미 가입된 아이디입니다.',
          goback : {
            link: '/register',
            str: '다시 입력하기'
          }
        };
        throw error;
      } else {
        const user = User();
        user.id = req.body.user_id;
        user.pw = req.body.user_pw;
        user.nickname = req.body.user_nickname;
      
        return user.save();
      }
    })
    .then((user) => {
      res.render('register_success.ejs');
    })
    .catch((err) => {
      if (err) {
        res.render('error.ejs', err);
      }
    });
}