const express = require('express');
const noteController = require('../controllers/note');
const router = express.Router();

router.get('/:title', noteController.getNotes);
router.post('/:title', noteController.addNotes);

module.exports = router;