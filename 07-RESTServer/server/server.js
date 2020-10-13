require('./config/config');

const mongoose = require('mongoose');

const express = require('express');

const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//config global de rutas
app.use( require('./routes/index') );

// , { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useNewUrlParser', true);
      mongoose.set('useFindAndModify', false);
      mongoose.set('useCreateIndex', true);
      mongoose.set('useUnifiedTopology', true);
// en local      mongoose.connect('mongodb://localhost:27017/cafe', (err, respuesta) =>{
  mongoose.connect(process.env.URLDB, (err, respuesta) =>{

    if (err) {
      throw err;
    } else {
      
      console.log('Base online');
    }

  });


app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto '+process.env.PORT);
});