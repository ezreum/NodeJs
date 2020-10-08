const http = require('http');


http.createServer( (req, res) =>{

    res.writeHead(200,{ 'Content-type': 'application/json' })
    let salida = {
        nombre: 'pepe',
        edad: 33,
        url: req.url
    }
    res.write(JSON.stringify(salida));
    // res.write('hola Mundo');
    res.end();
})
.listen(8080);
console.log('escuchando en el 8080');