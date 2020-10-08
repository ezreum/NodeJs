const express = require('express');
const app = express();
const hbs = require('hbs');
require('./views/helpers/helpers');

// obtener puerto heroku

const port = process.env.PORT || 3000;

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

app.listen(port, () =>{
        console.log('funcionando en el puerto '+port);
    });

//noprmal
// app.listen(3000, () =>{
//     console.log('funcionando en el puerto 3000');
// });