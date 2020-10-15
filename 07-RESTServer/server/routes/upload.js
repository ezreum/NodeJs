const express = require('express');

const fileUpload = require('express-fileupload');

const app = express();

const fs = require('fs');

const path = require('path');

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

app.use( fileUpload());

app.put('/upload/:tipo/:id', (req, res) =>{

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files){
        return res.status(400).json({
            ok: false,
            message: 'No se seleccionó ningún archivo o es incompatible'
        })
    } else{

        let tiposValidos = ['productos','usuarios'];

        if (tiposValidos.indexOf( tipo ) < 0 ) {
            return res.status(400).json({
                ok: false,
                message: 'los tipos permitidos son: '+tiposValidos.join(', '),
                tipo
            });
        }

        let archivo = req.files.archivo;

        let extensionesValidas = ['png','jpg','gif','jpeg'];
        let nombreTrozos = archivo.name.split('.');
        let extension = nombreTrozos[nombreTrozos.length -1 ];


        if ( extensionesValidas.indexOf(extension) < 0 ) {
            return res.status(400).json({
                ok: false,
                message: 'la extensión del archivo no es valida. Las permitidas son: '+extensionesValidas.join(', '),
                extension
            });            
        }

        //generar token aleatorio para el archivo
        let nombreArchivo = id+'-'+new Date().getMilliseconds()+'.'+extension;

        archivo.mv('uploads/'+tipo+'/'+nombreArchivo, (err) =>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            } else {
                tipo=='usuario'?imagenUsuario(id, res, nombreArchivo):
                imagenProducto(id, res, nombreArchivo);

            }
        });
    }
});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            })
        } else {
            
            if (!usuarioDB) {
                borrarArchivo(nombreArchivo, 'usuarios');
                return res.status(400).json({
                    ok: false,
                    message: 'usuario no existe'
                }) 
            }

            borrarArchivo(usuarioDB.img, 'usuarios');

            usuarioDB.img = nombreArchivo;

            usuarioDB.save( (err, usuarioActualizado) =>{

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }
                
                res.json({
                    ok:true,
                    usuarioActualizado,
                    img: nombreArchivo
                });

            })

        }
    })
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) =>{
        if (err) {
            borrarArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err
            }) 
        } else {
            
            if (!productoDB) {
                borrarArchivo(nombreArchivo, 'productos');
                return res.status(400).json({
                    ok: false,
                    message: 'no existe el producto'
                }) 
            }

            borrarArchivo(productoDB.img,'productos');

            productoDB.img = nombreArchivo;
            productoDB.save( (err, productoActualizado) =>{

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }
                
                res.json({
                    ok:true,
                    productoActualizado,
                    img: nombreArchivo
                });

            })

        }
    })
}

function borrarArchivo(nombreImg, tipo) {

    let imgPath = path.resolve(__dirname, '../../uploads/'+tipo+'/'+nombreImg);

            if ( fs.existsSync(imgPath) ) {
                fs.unlinkSync(imgPath);
            }

}

module.exports = app;
