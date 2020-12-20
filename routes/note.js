const express = require('express');
const noteController = require('../controllers/note');
const router = express.Router();

router.get('/:title/:pub_year', noteController.getNotes);
router.post('/', noteController.addNote);
router.post('/del', noteController.delNote);
router.post('/up', noteController.upNote);
router.post('/down', noteController.downNote);

module.exports = router;