const express = require('express');
const router = express.Router();

router.get('/signin', (req, res) => {
    // res.send('Ingresando a la app');
    res.render('users/signin');
});

router.get('/signup', (req, res) => { 
    // res.send('Formulario de autenticación');
    res.render('users/signup');
});

module.exports = router;