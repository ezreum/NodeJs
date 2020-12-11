const { io } = require('../server');
const  { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

   client.on('siguienteTicket', (data, callback)=>{
        let numero = ticketControl.siguiente();
        console.log('el siguiente ticket es: '+numero);
        callback(numero);
   });

   client.emit('estadoActual', {
      actual: ticketControl.getEstado(),
      ultimos4 : ticketControl.getUltimos()
   });

   client.on('atenderTicket',(data, callback)=>{

      if ( !data.escritorio) {
         return callback({
            err: true,
            mensaje: 'el escritorio es necesario'
         })
      } else {
         let atenderTicket = ticketControl.atenderTicket( data.escritorio );
         
         callback(atenderTicket);
      }

   });

   client.broadcast.emit('ultimos4', {
      ultimos4: ticketControl.getUltimos() 
   })

});