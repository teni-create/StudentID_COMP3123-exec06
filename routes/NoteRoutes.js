const Note = require('../models/NoteModel.js');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const fields = ['noteTitle', 'noteDescription', 'priority', 'dateAdded', 'dateUpdated'];

function content(req, res, next) {
    const value = req.body && req.body.content;
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return res.status(400).json({ message: 'Note content cannot be empty' });
    }
    req.noteContent = Object.fromEntries(fields.filter(key => Object.hasOwn(value, key))
        .map(key => [key, value[key]]));
    if (!Object.keys(req.noteContent).length) {
        return res.status(400).json({ message: 'Provide at least one note field' });
    }
    next();
}

router.param('noteId', (req, res, next, id) => {
    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }
    next();
});

// Create a note using the nested content payload from the README.
router.post('/notes', content, async (req, res, next) => {
    try {
        const note = await Note.create(req.noteContent);
        res.status(201).json(note);
    } catch (err) { next(err); }
});

// GET and DELETE requests do not require a request body.
router.get('/notes', async (req, res, next) => {
    try { res.json(await Note.find()); }
    catch (err) { next(err); }
});

router.get('/notes/:noteId', async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) { next(err); }
});

router.put('/notes/:noteId', content, async (req, res, next) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.noteId,
            { $set: req.noteContent }, { new: true, runValidators: true });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) { next(err); }
});

router.delete('/notes/:noteId', async (req, res, next) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
    } catch (err) { next(err); }
});

router.use((err, req, res, next) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'An error occurred while processing the note' });
});

module.exports = router;
