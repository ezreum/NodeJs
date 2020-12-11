
// comando para establecer la conexión
var socket = io();
var label1 = $('#lblTicket1');
var label2 = $('#lblTicket2');
var label3 = $('#lblTicket3');
var label4 = $('#lblTicket4');

var escritorio1 = $('#lblEscritorio1');
var escritorio2 = $('#lblEscritorio2');
var escritorio3 = $('#lblEscritorio3');
var escritorio4 = $('#lblEscritorio4');

var tickets=[
    label1,
    label2,
    label3,
    label4
];

var escritorios = [
    escritorio1,
    escritorio2,
    escritorio3,
    escritorio4
];


socket.on('connect', function(){
    console.log('se conecto al servicio de pantalla');
});

socket.on('disconnect', function(){
    console.log('se desconecto del servicio de pantalla');
});

socket.on('estadoActual', function(data) {
    console.log(data);
    visualizar(data.ultimos4);
});

socket.on('ultimos4', function(data) {
    console.log(hola);
    visualizar(data.ultimos4);
});

function visualizar( ultimos4 ) {
    
for (let i = 0; i <= ultimos4.length -1; i++) {
    
    tickets[i].text('Ticket ' + ultimos4[i].numero);
    escritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
}

}