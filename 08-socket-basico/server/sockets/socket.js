
const {io} = require('../server');
io.on('connection',(client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario:'donMajo',
        mensaje: 'Hola a todos'
    });

    client.on('disconnect', () =>{
        console.log('usuario desconectado');
    });

    client.on('enviarMensaje', (data, callback) =>{
        console.log(data);

        client.broadcast.emit('enviar mensaje',data);
        // if (data.usuario) {
        //     callback({
        //         resp: '¡todo fue bien!'
        //     });    
        // } else {
        //     callback({
        //         resp: '¡todo salió mal!'
        //     });
        // }
        
    })

});