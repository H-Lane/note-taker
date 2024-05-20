const express = require(`express`);
const path = require(`path`);

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// const html = require(`./routes/index`);
const api = require(`./routes/index`);

app.get(`/`, (req, res) =>
  res.sendFile(path.join(__dirname, `./public/index.html`))
);

app.get(`/notes`, (req, res) =>
  res.sendFile(path.join(__dirname, `./public/notes.html`))
);


// app.use(`/notes`, html);
app.use(`/api`, api);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
