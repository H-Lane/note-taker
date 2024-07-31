const path = require(`path`);
const uniqid = require(`uniqid`);
const apireq = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");
const dbFilePath = path.resolve(__dirname, "..", "db", "db.json");


apireq.get(`/`, (req, res) => {
  console.info(`${req.method} request recieved for notes`);

  fs.readFile(dbFilePath, (err, data) => {
    if (err) throw err;

    let fullDb = JSON.parse(data);
    res.json(fullDb);
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

    db.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(db));

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

  fs.writeFileSync(dbFilePath, JSON.stringify(newDb));

  res.json({message: `Deleted note with id ${req.params.id}`});
});

module.exports = apireq;
