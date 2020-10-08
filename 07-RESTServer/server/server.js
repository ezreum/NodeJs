require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuarios', function (req, res) {
  res.json('get Usuario');
})
 // para crear nuevas instancias
app.post('/usuarios', function (req, res) {

    let body = req.body;

    body.nombre===undefined?res.status(400).json({
        ok: false,
        mensaje: 'el nombre es necesario'
    }):'';

    res.json({
        persona: body});
  })

  //para actualizar
app.put('/usuarios/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    });
  })
 
  //para eliminar registro
  app.delete('/usuarios', function (req, res) {
    res.json('post Usuario');
  })

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto '+process.env.PORT);
});