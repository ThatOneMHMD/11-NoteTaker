// imported and required data:
const express = require('express');
const router = require('express').Router();
const path = require('path');

// this middleware allows the server to access the "public" folder! So, graabing files and links from this point so routing and linking must take this into account!!!
router.use(express.static('public'));

// default url path
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

// url ending with /notes leads to this path!
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// Wildcard route to direct users to a 404 page (always last in order like this)
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/assets/pages/404.html'))
);

// export data to be used later!
module.exports = router;