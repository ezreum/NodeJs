const express = require('express');

let { verificarToken, verificarRol } = require('../middleware/authentication');

const app = express();

let Categoria = require('../models/categoria');

//listar todas las categorias
app.get('/categoria', verificarToken, (req, res) =>{
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre email')
    .exec( (err, categorias) =>{
        if (err) {
            return res.json({
                ok: false,
                err
            })
        } else {
            Categoria.countDocuments({}, (err, numero) => {

                res.json({
                  ok: true,
                  categorias,
                numero});
            })
        }
    });
});

//listar una categoria por id
app.get('/categoria/:id', verificarToken, (req, res) =>{
    
    let id = req.params.id;
console.log(id);
    if (id==undefined) {
        return res.status(400).json({
            ok: false,
            message: 'no se proporciono el id'
        })
    }
    Categoria.findById(id, ( err, categoria )=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: 'no existe la categoria'
            })
        } else {
            res.json({
                ok: true,
                categoria
            })
        }
    })
});  

//crear categoria
app.post('/categoria', verificarToken, (req, res) =>{
    let body = req.body;
    let usuario = req.usuario

    let categoria = new Categoria({
      descripcion: body.descripcion,
      usuario
    });

    categoria.save( (err, categoriaDB) => {

      if (err) {
        res.status(500).json({
            ok: false,
            err
        })
      } else {
          if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
          })
        }
        res.json({
          ok: true,
            categoria: categoriaDB});
      }
    }) 
});

//actualizar categoria
app.put('/categoria/:id', verificarToken, (req, res) =>{
    let id = req.params.id;
    let body = req.body;
    console.log(id);
    let descripcion = {
        descripcion: body.descripcion};
    Categoria.findByIdAndUpdate( id, descripcion, {new: true, runValidators:true}, (err, categoriaDB) =>{
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
          } else {
              if (!categoriaDB) {
                res.status(400).json({
                    ok: false,
                    err
              })
            }
            res.json({
              ok: true,
                categoria: categoriaDB});
          }
    } );
});


//borrar la categorias
app.delete('/categoria/:id', [verificarToken,verificarRol], (req, res) =>{
//solo puede un admin
let id = req.params.id;
Categoria.findByIdAndDelete( id, (err, categoriaDB) =>{
    
    
    if (err) {
        res.status(500).json({
            ok: false,
            err
        })
      } else {
          if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err: 'el id no existe'
          })
        }
        res.json({
          ok: true,
            categoria: categoriaDB});
      }
    });
});

module.exports = app;