const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
  id: String,
  pw: String,
  nickname: String
});

module.exports = mongoose.model('user', UserScheme);