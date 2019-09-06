const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'curriculum web' });
});


router.get('/escolaridad', (req, res) => {
  res.render('escolaridad', { title: 'escolaridad' });
});

router.get('/contacto', (req, res) => {
  res.render('contacto', { title: 'contacto' });
});

module.exports = router;