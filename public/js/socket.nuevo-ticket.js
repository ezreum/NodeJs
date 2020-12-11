
// comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('se conecto al servicio de tickets');
});

socket.on('disconnect', function(){
    console.log('se desconecto del servicio de tickets');
});

socket.on('estadoActual', function(estado){
    label.text(estado.actual);
});

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, (siguienteTicket)=>{
        label.text(siguienteTicket);
    });
});