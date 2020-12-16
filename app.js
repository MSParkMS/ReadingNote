const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// db
const dbUrl = 'mongodb://localhost:27017/reading_note';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => console.log('Error: ' ,err));
db.on('open', () => console.log('Connected'));

// view
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

// middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// routes middleware
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));

app.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    const error = {
      str: '세션이 만료되었습니다.',
      goback: {
        str: '다시 로그인하러가기',
        link: '/login'
      }
    };
    res.render('error.ejs', error);
  }
});

app.use('/home', require('./routes/home'));
app.use('/booklist', require('./routes/booklist'));
app.use('/note', require('./routes/note'));

// error midleware
app.use((req, res, next) => {
  res.status(404).render('404.ejs');
});

app.listen(3000, () => console.log('server is running'));