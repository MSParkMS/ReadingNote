const mongoose = require('mongoose');
const Book = require('../models/book');
const BookList = require('../models/booklist');

exports.getBookList = (req, res) => {
  BookList.findOne({id: req.session.user.id}, (err, document) => {
    if (err) {
      res.render('error.ejs', { str: 'DB 에러' });
      return;
    }

    res.render('booklist.ejs', { nickname: req.session.user.nickname });
  });
}

exports.addBookList = (req, res) => {
  Book.findOne({title: req.title, pub_year: req.pub_year}, (err, book) => {
    if (err) {
      res.render('error.ejs', { str: 'DB 에러' });
      return;
    }

    if (!book) {
      console.log(req.body.title);
      console.log(req.body.author);
      console.log(req.body.publisher);
      console.log(req.body.pub_year);
      console.log(req.body.imgUrl);
      if (!req.body.title ||
          !req.body.author ||
          !req.body.publisher ||
          !req.body.pub_year ||
          !req.body.imgUrl) {
            const error = {
              str: '책 정보가 올바르지 않습니다.',
              goback: {
                str: '다시 입력하기',
                link: '/booklist'
              }
            }
            res.render('error.ejs', error);
            return;
          }

      // 책 저장
      const newBook = Book();
      newBook.title = req.title;
      newBook.author = req.author;
      newBook.publisher = req.publisher;
      newBook.pub_year = req.pub_year;
      newBook.imgUrl = req.imgUrl;
      newBook.save((err) => {
        res.render('error.ejs', { str: 'DB 에러' });
        return;
      });
    }

    BookList.findOne({id: req.session.user.id}, (err, booklist) => {
      if (err) {
        res.render('error.ejs', { str: 'DB 에러' });
        return;
      }

      if (!booklist) {

      }
      
      booklist.books.push(book);
      booklist.save((err) => {
        if (err) {
          res.render('error.ejs', { str: 'DB 에러' });
          return;
        }

        res.redirect('/booklist');
      });
    });
  });
}