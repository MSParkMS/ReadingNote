const mongoose = require('mongoose');
const Book = require('../models/book');
const BookList = require('../models/booklist');
const Note = require('../models/note');

exports.getBookList = (req, res) => {
  BookList.findOne({id: req.session.user.id}).exec()
    .then((booklist) => {
      if (!booklist) {
        const booklist = BookList();
        booklist.id = req.session.user.id;
        booklist.books = [];
        return booklist.save();
      }
      return new Promise((resolve) => {
        resolve(booklist);
      });
    })
    .then((booklist) => {
      Book.find({_id: booklist.books}).exec()
        .then((books) => {
          res.render('booklist.ejs', { nickname: req.session.user.nickname, books: books });
        })
        .catch((err) => {
          res.render('error.ejs', err);
        });
    })
    .catch((err) => {
      res.render('error.ejs', err);
    });
}

exports.addBookList = (req, res) => {
  BookList.findOne({id: req.session.user.id}).exec()
    .then((booklist) => {
      Book.findOne({title: req.body.title, pub_year: req.body.pub_year}).exec()
      .then((book) => {
        if (!book) {
          if (!req.body.title ||
              !req.body.author ||
              !req.body.publisher ||
              !req.body.pub_year) {
                throw {
                  str: '책 정보가 올바르지 않습니다.',
                  goback: {
                    str: '다시 입력하기',
                    link: '/booklist'
                  }
                };
              }

          const newBook = Book();
          newBook.title = req.body.title;
          newBook.author = req.body.author;
          newBook.publisher = req.body.publisher;
          newBook.pub_year = req.body.pub_year;
          return newBook.save();
        } else {
          return new Promise((resolve) => {
            resolve(book);
          });
        }
      })
      .then((book) => {
        booklist.books.push(book._id);
        return booklist.save();
      })
      .then((booklist) => {
        res.redirect('/booklist');
      })
      .catch((err) => {
        res.render('error.ejs', err);
      });
    })
    .catch((err) => {
      res.render('error.ejs', err);
    });
}

exports.delBookList = (req, res) => {
  BookList.findOne({id: req.session.user.id}).exec()
    .then((booklist) => {
      Book.findOne({title: req.params.title, pub_year: req.params.pub_year}).exec()
      .then((book) => {
        booklist.books.remove(book._id);
        return booklist.save();
      })
      .then((booklist) => {
        return Note.deleteOne({id: req.session.user.id, title: req.params.title}).exec();
      })
      .then((result) => {
        res.redirect('/booklist');
      })
      .catch((err) => {
        res.render('error.ejs', err);    
      })
    })
    .catch((err) => {
      res.render('error.ejs', err);
    });
}