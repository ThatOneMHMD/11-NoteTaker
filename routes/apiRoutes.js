// imported and required data!
const router = require('express').Router();
const fs = require('fs');
const notes = require('../db/db.json');

// the url path here is /api/notes: facilitates the GET method which displays the savedNotes!
router.get('/notes', (req, res) => {
    res.json(notes);
});

// the url path here is /api/notes: faciliates the POST method which pushes or adds new notes!
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
  
// the url path here is /api/notes/:id (id types in directly without the ':'): facilitates the deletion of selected notes. Unique IDs are used to specifiy which note is to be deleted!
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

// the url path here is /api/notes/:id (id types in directly without the ':'): facilitates the update of selected notes. NOTE: this feature is not accessible via the client front end, but is accessible via Insomnia or other back end methods!
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
  

// function that allows any changes to the notes to be saved into the database. Any new notes, any updates, any deletions, etc. are all meant to presist and be saved into the database in the backend!
function saveNotesToFile() {
  fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
}

// function that generates a unique id for all notes. The id here is the unique JS time stamp that can not be replicated!
function generateUniqueId() {
  return Date.now().toString();
}

// export data for use in server.js later on!
module.exports = router;