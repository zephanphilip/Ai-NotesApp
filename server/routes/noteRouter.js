const express = require('express');
const { getNotes, postNote, updateNote, deleteNote } = require('../controllers/noteController');

const router = express.Router()


//get all workout
router.get('/:userId',getNotes);

//post a workout
router.post('/',postNote);

//update workouts
router.put('/:id',updateNote);

//delete a workout
router.delete('/:id',deleteNote);


module.exports = router