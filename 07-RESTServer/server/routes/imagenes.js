const express = require('express');

const fs = require('fs');

const path = require('path');

const { verificaTokenImg } = require('../middleware/authentication');

const app = express();

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) =>{
    let tipo = req.params.tipo;
    let img = req.params.img;

    let imgPath = path.resolve(__dirname, '../../uploads/'+tipo+'/'+img);


    let noImage=path.resolve(__dirname, '../assets/no-image.jpg');

    if ( fs.existsSync(imgPath) ) {
        res.sendFile(imgPath);
    } else {
        res.sendFile(noImage);
    }

});

module.exports=app;