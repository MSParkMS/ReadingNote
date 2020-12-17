const mongoose = require('mongoose');
const User = require('../models/user');

exports.register = (req, res) => {
  User.findOne({'id' : req.body.user_id}, (err, document) => {
    if (err) {
      res.render('error.ejs', { str: 'DB 에러' });
      return;
    }

    if (document) {
      const error = {
        str: '이미 가입된 아이디입니다.',
        goback : {
          link: '/register',
          str: '다시 입력하기'
        }
      };
      res.render('error.ejs', { error });
      return;
    } else {
      const user = User();
      user.id = req.body.user_id;
      user.pw = req.body.user_pw;
      user.nickname = req.body.user_nickname;
    
      user.save((err) => {
        if (err) {
          res.render('error.ejs', { str: 'DB 에러' });
          return;
        }
    
        res.writeHead(200, {"Content-Type": "text/html;charset=utf8"});
        res.write('<center>');
        res.write('<h1>회원 가입을 축하드립니다.</h1>');
        res.write('<br><a href="/login">로그인 페이지로</a>');
        res.write('</center>');
        res.end();
      });
    }
  });
}