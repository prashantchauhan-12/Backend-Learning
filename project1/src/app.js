const express = require('express');
const noteModel = require('./models/note.model');

const app = express();
app.use(express.json());


// note = { title, description }

/*
POST /notes
GET /notes
PATCH /notes/:index
DELETE /notes/:index
*/

app.post('/notes', async (req, res) => {
    const data = req.body;

    await noteModel.create({
        title: data.title,
        description: data.description
    });

    res.status(201).json({
        message: "note created successfully"
    })
})

app.get('/notes', async (req, res) => {
    const notes = await noteModel.find(); // []

    // const notesOne = await noteModel.findOne({
    //     title: "test22"
    // });

    /*
    find => [{}, {}] or []
    findOne => {} or null
    */

    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes,
    })
})

app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete({
        _id: id
    });

    res.status(200).json({
        message: "note deleted successfully",
    })
})

app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const description = req.body.description;

    await noteModel.findOneAndUpdate(
        { _id: id },
        { description: description }
    );

    res.status(201).json({
        message: "note updated successfully"
    });
})

module.exports = app;