const Notes = require('../models/noteModel')
const mongoose = require('mongoose');


//get all notes
const getNotes = async (req, res) =>{
    try{
    const userId = req.params.userId
    const notes = await Notes.find({ userId: userId }).sort({createdAt: -1})
    if (notes.length === 0) {
        return res.status(404).send("No records found for the user.");
      }
      res.status(200).send(notes);
    } catch (err) {
      res.status(500).send(err);
    }
}


//post a note
const postNote = async (req, res) =>{    
    //add doc to db
    try{
        const newNote = req.body
        const newRecord = new Notes(newNote)
        const saveRecord =await newRecord.save()
        res.status(200).json(saveRecord)
    }catch(error){
        res.status(400).json(error)
    }
}


//update a note
const updateNote = async (req, res) =>{
    //update doc to db
    try {
        const id = req.params.id;
        const newRecord = req.body;
        const record = await Notes.findByIdAndUpdate(id,newRecord,{new:true}) 
        if(!record) return res.status(404).send()
        res.status(200).json(record)
    } catch (error) {
        res.status(500).send(error);
    }
}


//delete a note
const deleteNote = async (req, res) =>{
    try{
        const {id} = req.params
        const record = await Notes.findByIdAndDelete(id)
        if (!record) return res.status(404).send()
        res.status(200).json(record)
    }
    catch(error){
        res.status(400).json(error)
    }
}



module.exports = {getNotes, postNote, updateNote, deleteNote}