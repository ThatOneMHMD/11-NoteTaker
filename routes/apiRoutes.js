const router = require('express').Router();
const fs = require('fs');
const notes = require('../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = generateUniqueId();
  
    // Check if the required fields (title and text) are provided
    if (!newNote.title || !newNote.text) {
      return res.status(400).json({ error: 'Title and text are required fields' });
    }
  
    notes.push(newNote);
    saveNotesToFile();
    res.json(newNote);
});
  

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const index = notes.findIndex((note) => note.id === noteId);
  
    // Check if note with specified ID exists
    if (index === -1) {
      return res.status(404).json({ error: 'Note not found. Please enter a valid note id' });
    }

    res.status(404).json({ error: 'Note Deleted successfully!' });
    notes.splice(index, 1);
    saveNotesToFile();
    res.sendStatus(204);
});

router.put('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const updatedNote = req.body;
  
    // Find the index of the note with the specified ID
    const index = notes.findIndex((note) => note.id === noteId);
  
    // Check if note with specified ID exists
    if (index === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }
  
    // Update the note
    notes[index].title = updatedNote.title;
    notes[index].text = updatedNote.text;
    saveNotesToFile();
  
    res.json(notes[index]);
});
  
  

function saveNotesToFile() {
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
}

function generateUniqueId() {
    return Date.now().toString();
}

module.exports = router;
