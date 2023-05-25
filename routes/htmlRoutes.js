const express = require('express');
const router = require('express').Router();
const path = require('path');

// Graabing files and links form this point so routing and linking must take this into account!!!
router.use(express.static('public'));


router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// Wildcard route to direct users to a 404 page (always last in order like this)
// NOTE: THIS PAGE IS LODAING BUT NOT THE CSS< JS< OR IMAGE< IN IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/assets/pages/404.html'))
);

module.exports = router;