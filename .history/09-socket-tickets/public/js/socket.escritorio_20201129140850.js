var socket = io();

var searchParams = new URLSearchParams( window.location.search );

//tiene el escritorio¿?
console.log(searchParams.has('escritorio'));

socket.on('connect', function(){
    console.log('se conecto al servicio de escritorio');
});

socket.on('disconnect', function(){
    console.log('se desconecto del servicio de escritorio');
});

if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new error('Se necesita un escritorio');
} else {
    var escritorio = searchParams.get('escritorio');

    var label = $('small');

    $('h1').text('Escritorio '+escritorio);


    $('button').on('click', function(){
        socket.emit('atenderTicket', { escritorio: escritorio }, (resp) =>{

            if (resp === 'El contador está al día') {
                
                alert(resp);
                label.text('El contador está al día');
            }
            else{
            label.text('ticket numero: '+resp.numero);
            }
        });

    });


}


