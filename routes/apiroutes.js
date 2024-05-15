const path = require(`path`);
const uniqid = require(`uniqid`);
const fs = require(`fs`);

module.exports = (app) => {

  app.get(`/api/notes`, (req, res) => {
    res.sendFile(path.join(__dirname, `../db/db.json`));
  });



};
