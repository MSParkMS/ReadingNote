const mongoose = require('mongoose');
const Note = require('../models/note');

exports.getNotes = (req, res) => {
  Note.findOne({id: req.session.user.id, title: req.params.title}).exec()
    .then((note) => {
      if (!note) {
        const newNote = Note();
        newNote.id = req.session.user.id;
        newNote.title = req.params.title;
        return newNote.save();
      }
      return new Promise((resolve) => {
        resolve(note);
      });
    })
    .then((note) => {
      const view = {
        nickname: req.session.user.nickname,
        title: req.params.title,
        note: note
      };
      res.render('note.ejs', view);
    })
    .catch((err) => {
      res.render('error.ejs', err);
    });
}

exports.addNotes = (req, res) => {
  Note.findOne({id: req.session.user.id, title: req.params.title}).exec()
    .then((note) => {
      const comment = req.body.comment;
      const page_begin = req.body.page_begin;
      const page_end = req.body.page_end;
      const newComment = comment + '(pg.' + page_begin + ' ~ pg.' + page_end + ')';
      note.comments.push(newComment);
      return note.save();
    })
    .then((note) => {
      res.redirect('/note/'+req.params.title);
    })
    .catch((err) => {
      res.render('error.ejs', err);
    });
}