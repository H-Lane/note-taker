const express = require(`express`);

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const html = require(`./routes/index`);
const api = require(`./routes/index`);

app.use(`/`, html);
app.use(`/api`, api);


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );