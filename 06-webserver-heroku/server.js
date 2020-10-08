const express = require('express');
const app = express();
const hbs = require('hbs');
require('./views/helpers/helpers');
//Express hbs engine
hbs.registerPartials(__dirname + '/views/partials');
app.use( express.static(__dirname+'/public') );
//handlebars
app.set('view engine','hbs');



app.get('/', function ( req,res ) {
    res.render('home.hbs',{
        nombre: 'pedro'
    });
});

app.get('/about', function ( req,res ) {
    res.render('about.hbs');
});

// app.get('/', function ( req,res ) {
//     res.send('<h1>Hola Mundo</h1>');
// });

app.listen(3000);