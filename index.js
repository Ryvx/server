const express = require('express');
const cors = require('cors');
const fs = require('fs');
//const port = 3001
const {port = 3001 } = process.env;

let pokieData = require('./pokieData.json');

let rawdata = fs.readFileSync('pokieData.json');
let pokieData = JSON.parse(rawdata);
console.log(pokieData.json);

const app = express();

app.use(cors());

app.get('/pokemon', (req, res) => {
    res.send(pokieData)
})

app.get("/pokemon/:id", async (req, res) => {
    const { id } = req.params;
  });

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})