const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const BookScheme = new Scheme({
  title: String,
  author: String,
  publisher: String,
  pub_year: Number,
});

module.exports = mongoose.model('book', BookScheme);