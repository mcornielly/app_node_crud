const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Index'); // .send imprime en la vista del servidor
    res.render('index'); // .send imprime en la vista del servidor
});

router.get('/about', (req, res) => {
    // res.send('About');
    res.render('about');

});

module.exports = router;