const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;

    const errors = [];

    if (!title) {
        errors.push({ text: 'Por favor escriba el Titulo ' });
    }

    if (!description) {
        errors.push({ text: 'Por favor escriba la Descripcion ' });
    }

    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Nota Agregada correctamente!!!');
        res.redirect('/notes');

    }
});

router.get('/notes', isAuthenticated, async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async(req, res) => {
    const id = req.params.id;
    const note = await Note.findById(id);
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    const id = req.params.id;
    await Note.findByIdAndUpdate(id, { title, description });
    req.flash('success_msg', 'Nota Editada correctamente!!!');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    req.flash('success_msg', 'Nota Borrada correctamente!!!');
    res.redirect('/notes');
});

module.exports = router;