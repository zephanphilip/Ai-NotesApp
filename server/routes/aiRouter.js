const express = require('express');
const {  postAiNotes } = require('../controllers/aiController');

const router = express.Router()

//post ai notes
router.post('/',postAiNotes);

module.exports = router