const express = require('express');

let { verificarToken, verificarRol } = require('../middleware/authentication');

const _ = require('underscore');

const app = express();


let Producto = require('../models/producto');
const producto = require('../models/producto');

//listar todos los productos
app.get('/producto', verificarToken, (req, res) =>{
    Producto.find({})
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec( (err, productos) =>{
        if (err) {
            return res.json({
                ok: false,
                err
            })
        } else {
            Producto.countDocuments({}, (err, numero) => {

                res.json({
                  ok: true,
                  productos,
                numero});
            })
        }
    });
});

//listar una producto por id
app.get('/producto/:id', verificarToken, (req, res) =>{
    
    let id = req.params.id;
console.log(id);
    if (id==undefined) {
        return res.status(400).json({
            ok: false,
            message: 'no se proporciono el id'
        })
    }
    Producto.findById( id )
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion') 
    .exec(( err, producto )=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: 'no existe la producto'
            })
        } else {
            res.json({
                ok: true,
                producto
            })
        }
    })
    
});  

//buscar por nombre
app.get('/producto/buscar/:nombre', verificarToken, (req, res) =>{
    
    let nombre = req.params.nombre;
    
let regexp = new RegExp(nombre, 'i');

    if (nombre==undefined) {
        return res.status(400).json({
            ok: false,
            message: 'no se proporciono el id'
        })
    }

    

    Producto.find( {nombre: regexp} )
    .populate('categoria', 'descripcion') 
    .exec(( err, producto )=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: 'no existe la producto'
            })
        } else {
            res.json({
                ok: true,
                producto
            })
        }
    })
    
});  

//crear producto
app.post('/producto', verificarToken, (req, res) =>{
    let body = req.body;
    let usuario = req.usuario

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario
    });

    producto.save( (err, productoDB) => {

      if (err) {
        res.status(500).json({
            ok: false,
            err
        })
      } else {
          if (!productoDB) {
            res.status(400).json({
                ok: false,
                err
          })
        }
        res.status(201).json({
          ok: true,
            producto: productoDB});
      }
    }) 
});

//actualizar producto
app.put('/producto/:id', verificarToken, (req, res) =>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','descripción','disponible','precioUni','categoria'] );
    
    Producto.findByIdAndUpdate( id, body, 
        {new: true, runValidators:true}, (err, productoDB) =>{
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
          } else {
              if (!productoDB) {
                res.status(400).json({
                    ok: false,
                    err
              })
            }
            res.json({
              ok: true,
                producto: productoDB});
          }
    } );
});


//borrar la productos
app.delete('/producto/:id', [verificarToken,verificarRol], (req, res) =>{
//solo puede un admin
let id = req.params.id;
Producto.findById( id, (err, productoDB) =>{
    
    
    if (err) {
        res.status(500).json({
            ok: false,
            err
        })
      } else {
          if (!productoDB) {
            res.status(400).json({
                ok: false,
                err: 'el id no existe'
          })
        }
        productoDB.disponible = false;

        productoDB.save( (err, productoBorrado) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                })
              } else {
                  if (!productoBorrado) {
                    res.status(400).json({
                        ok: false,
                        err: 'el id no existe'
                  })
                }
        res.json({
          ok: true,
            producto: productoBorrado});
                }
            }); 
        }
    });
});


module.exports = app;