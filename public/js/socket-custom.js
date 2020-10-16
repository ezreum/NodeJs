var socket = io();

//briefing: on es para escuchar y emit para emitir
        socket.on('connect', ()=>{
            
            console.log('Conectado al server');

        });

        socket.on('disconnect', ()=>{
            
            console.log('Desconectado del server');

        });

        socket.emit('enviarMensaje', {
            usuario: 'pepe',
            mensaje: 'llegó la conexión'
        }, (resp) =>{
            console.log('Respuesta server', resp);
        });

        socket.on('enviarMensaje', (res) => {
            console.log(res);
        })