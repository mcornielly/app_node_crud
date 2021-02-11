const express = require('express');
const router = express.Router();
const Note = require('../models/Node');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/new', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/create', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    
    if(!title){
        errors.push({text: 'Please Write a Title'});
    }

    if(!description){
        errors.push({text: 'Please Write a Description'});
    }

    if(errors.length > 0){
        res.render('notes/new-note', {
            errors, 
            title,
            description
        });
    }else{
        const newNote = new Note({ title, description });
        // console.log(newNote);
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'La Nota fue creada con exito..!!!');
        res.redirect('/notes');
        // res.send('ok');
    }

});

// muestra todas las notas.
router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({ user: req.user.id}).lean().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
    // res.send(notes);
    // res.send('Notas desde la base de datos');
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', {note});
})

router.put('/notes/update/:id', isAuthenticated, async (req, res) => {
    const { title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'La Nota fue actualizada con exito..!!!');
    res.redirect('/notes'); 
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    console.log(req.params.id);
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'La Nota fue eliminada con éxito..!!!');
    res.redirect('/notes'); 
    // res.send("Ok");
});

module.exports = router;