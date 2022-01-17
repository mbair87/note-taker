const express = require('express');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req,res) => {
fs.readFile('./db/db.json', (err, data) => {
    if(err) console.log(err);
    console.log(JSON.parse(data));
res.json(JSON.parse(data))
})
});

//GET/notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

//GET *
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
