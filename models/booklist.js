const mongoose = require('mongoose');
const Book = require('../models/book');
const Scheme = mongoose.Schema;

const BookListScheme = new Scheme({
  id: String,
  books: [Book.schema]
});

module.exports = mongoose.model('booklist', BookListScheme);