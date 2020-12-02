const express = require('express');
const cors = require('cors');
const fs = require('fs');
//const port = 3001
const {PORT = 3001 } = process.env;

let rawdata = fs.readFileSync('pokieData.json');
let pokieData = JSON.parse(rawdata);

const app = express();

app.use(cors());

app.get('/pokemon', (req, res) => {
    res.send(pokieData)
})

app.get("/pokemon/:id", async (req, res) => {
    const { id } = req.params;
    const filterData = pokieData.filter(poki => Number(poki.id) === Number(id))
    console.log(typeof pokieData[0].id, typeof id)
    
    res.send(filterData);
  });

app.get("/pokemon/:id/:info", async (req, res) => {
    const { info } = req.params;
    const { id } = req.params;
    const selectedPokie = pokieData.find(poki => Number(poki.id) === Number(id))
    console.log(selectedPokie)
    const acceptedFields = new Set(["base","type","name"])
    if (acceptedFields.has(info)) {
      return res.send(selectedPokie[info]);
    }
    res.status(400).send("Pokemon is sleeping");
  });


  // app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})