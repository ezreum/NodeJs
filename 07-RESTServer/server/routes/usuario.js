const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificarToken, verificarRol } = require('../middleware/authentication');

const app = express();

app.get('/usuarios', verificarToken, function (req, res) {
  
  let desde = req.query.desde || 0;
  desde= Number(desde);

  let limite = req.query.limite || 0;
  limite= Number(limite);

  Usuario.find({estado: true}, 'nombre email rol estado google img')
  .skip(desde) //para obtener del 6 al 10
  .limit(limite) //limite
  .exec( (err, usuarios) =>{

    if (err) {
      return res.status(400).json({
          ok: false,
          err
      })
    } else {

      Usuario.count({estado: true}, (err, numero) => {

        res.json({
          ok: true,
          usuarios,
        numero});
      });
      // usuarioDB.password= null;
    }

  });
  });
   // para crear nuevas instancias
app.post('/usuarios', [verificarToken,verificarRol], function (req, res) {
  
      let body = req.body;

      let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol,
      });

      usuario.save( (err, usuarioDB) => {

        if (err) {
          res.status(400).json({
              ok: false,
              err
          })
        } else {
          // usuarioDB.password= null;
          res.json({
            ok: true,
              persona: usuarioDB});
        }
      }) 

      
  
});
  
    //para actualizar
app.put('/usuarios/:id', [verificarToken,verificarRol], function (req, res) {
      
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email','rol','estado','img'] );
    
    // delete body.password;
    // delete body.google;

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators:true},
       (err,usuarioDB) =>{
      if (err) {
        res.status(400).json({
            ok: false,
            err: {
              message: 'usuario no encontrado'
            }
        })
      } else {
        // usuarioDB.password= null;
        res.json({
          ok: true,
            usuario: usuarioDB});
      }
    });

    
})
    // Usuario.findById(id, (err,usuarioDB) =>{
    //   usuarioDB.save();
    // });

    
   
    //para eliminar registro
app.delete('/usuarios/:id', [verificarToken,verificarRol], function (req, res) {
    
    let id = req.params.id;


    // Hacer un delete físico
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) =>{

    //   if (err) {
    //     res.status(400).json({
    //         ok: false,
    //         err
    //     })
    //   } else {
    //     if ( !usuarioBorrado ) {
    //       res.status(400).json({
    //         ok: false,
    //         err: 'usuario no encontrado'
    //     })
    //     }
    //     res.json({
    //       ok: true,
    //       usuario: usuarioBorrado});
    //   }

    // });


    //hacer un delete actual que es cambiando su estado
    
    let body = _.pick(req.body, ['estado'] );

    Usuario.findByIdAndUpdate(id, body, {new: true},
       (err,usuarioBorrado) =>{
      if (err) {
        res.status(400).json({
            ok: false,
            err
        })
      } else {
        // usuarioDB.password= null;
        res.json({
          ok: true,
            usuario: usuarioBorrado});
      }

    })
  });


    module.exports=app;