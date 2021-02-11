const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    // res.send('Ingresando a la app');
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => { 
    // res.send('Formulario de autenticación');
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if(name.length <= 0){
        errors.push({text: 'Debe Ingresar un Nombre.'});
    }
    
    if(password != confirm_password){
        errors.push({text: 'Password no coincide'});
    }

    if(password.length < 4) {
        errors.push({text: 'Password debe ser mayor a 4 caracteres'});
    }

    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else{
        const emailUser = await User.findOne({ email: email });
        if(emailUser){
            reg.flash('error_msg', 'El Email esta en uso');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'El Usuario ha sido registrado');
        res.redirect('/users/signin');
        // res.send("Ok");
    }
    // console.log(req.body);
});

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/users/signin');
});

module.exports = router;