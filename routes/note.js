const express = require('express');
const noteController = require('../controllers/note');
const router = express.Router();

router.get('/:title', noteController.getNotes);
router.post('/:title', noteController.addNote);
router.post('/del/:title/:index', noteController.delNote);
router.post('/up/:title/:index', noteController.upNote);
router.post('/down/:title/:index', noteController.downNote);

module.exports = router;