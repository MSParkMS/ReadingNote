const mongoose = require('mongoose');
const Book = require('../models/book');
const Scheme = mongoose.Schema;

const BookListScheme = new Scheme({
  id: String,
  books: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('booklist', BookListScheme);