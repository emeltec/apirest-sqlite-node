const express = require('express');
const cors = require('cors');
const routes = require('./server/routes/routes')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// SERVIDOR
const app = express();

// habilitar body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Habiliar los cors
app.use(cors());

// Rutas del app
app.use('/', routes());

// Carpeta publica
app.use(express.static('./server/uploads'));

app.listen(PORT, () => {
  console.log('Listen on port: ', PORT);
})