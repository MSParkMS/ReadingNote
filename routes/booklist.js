const express = require('express');
const bookListController = require('../controllers/booklist');
const router = express.Router();

router.get('/', bookListController.getBookList);
router.post('/', bookListController.addBookList);

module.exports = router;