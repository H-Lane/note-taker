const path = require(`path`);
const uniqid = require(`uniqid`);
const apireq = require("express").Router();

const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

apireq.get(`/notes`, (req, res) => {
  console.info(`${req.method} request recieved for notes`);

  readFromFile(`./db/db.json`).then((data) => res.json(JSON.parse(data)));
});

apireq.post(`/notes`, (req, res) => {
  console.info(`${req.method} request recieved to submit note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    readAndAppend(newNote, `../db/db.json`)

    const response = {
      status: `success`,
      body: newNote,
    };

    res.json(response);
  } else {
    res.json(`Error in creating new note`);
  }
});

module.exports = apireq;
