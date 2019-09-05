const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'curriculum web' });
});


router.get('/certificados', (req, res) => {
  res.render('certificados', { title: 'certificados y diplomas' });
});

module.exports = router;