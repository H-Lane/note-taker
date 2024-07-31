const path = require(`path`);
const uniqid = require(`uniqid`);
const apireq = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");

const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");

apireq.get(`/`, (req, res) => {
  console.info(`${req.method} request recieved for notes`);

  fs.readFile(db, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

apireq.post(`/`, (req, res) => {
  console.info(`${req.method} request recieved to submit note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    readAndAppend(newNote, db);

    const response = {
      status: `success`,
      body: newNote,
    };

    res.json(response);
  } else {
    res.json(`Error in creating new note`);
  }
});

apireq.delete(`/:id`, (req, res) => {
  const newDb = db.filter((note) => note.id !== req.params.id);

  fs.writeFileSync(db, JSON.stringify(newDb));

  res.json(fs.readFile.json(newDb));
});

module.exports = apireq;
