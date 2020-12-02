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
    const infoData = pokieData.filter(poki => Number(poki.id) === Number(id))
    .map(poki => (poki.name.english === info) ? poki.name.english : null)
      
     // {
      //   if (poki.name.english === info) {
      //     return poki.name.english;
      //   }
      //   else {
      //     return;
      //   }
      // })

    console.log(typeof pokieData[0].name.english, typeof info)
    res.send(infoData);
  });


  // app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})