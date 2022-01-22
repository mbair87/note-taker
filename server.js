const express = require('express');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();

// const notes = require('./db/db.json');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//GET/notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//GET *
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//api routes

//get
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.json(JSON.parse(data))
  })
});



//post
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let currentNotes = JSON.parse(data)
    currentNotes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(currentNotes), function (err) {
      console.log(err)
      res.json(newNote)
    })
  })

})

//delete

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let currentNotes = JSON.parse(data)
    filteredNotesArray = [];
    for (let i = 0; i < currentNotes.length; i++) {
      if (currentNotes[i].id !== req.params.id) {
        filteredNotesArray.push(currentNotes[i]);
      }
    }
    fs.writeFile('./db/db.json', JSON.stringify(filteredNotesArray), function (err) {
      console.log(err)
      res.json(filteredNotesArray)
    })
  })


})






app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
