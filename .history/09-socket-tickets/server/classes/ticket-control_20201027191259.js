
const fs = require('fs');

class Ticket {

constructor(numero, escritorio) {

    this.numero = numero;
    this.escritorio=escritorio;

}

}

class TicketControl {
 
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4=[];


        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            
            this.ultimo = data.ultimo;
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4;
        } else{
            this.reiniciarConteo();
        }



    }

    siguiente(){

        this.ultimo+=1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        
        return `Ticket ${this.ultimo}`;
    }

    getEstado() {
        
        return `Ticket ${this.ultimo}`;
    }

    getUltimos() {
        
        return this.ultimos4;
    }

    atenderTicket( escritorio ) {
        if ( this.tickets.length === 0 ) {
            return 'El contador está al día';
        } else {
            let pendiente = this.tickets[0].numero;
            
            this.tickets.shift();

            let atender = new Ticket(pendiente, escritorio);

            this.ultimos4.unshift(atender);
            
            while ( this.ultimos4.length > 4 ) {
                this.ultimos4.splice(-1,1);//borra el ultimo
            }
            console.log('Ultimos 4');
            console.log(this.ultimos4);
            this.grabarArchivo();

            return atender;
        }
    }

    grabarArchivo(){

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets : this.tickets,
            ultimos4: this.ultimos4
        };

        jsonData = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json',jsonData);

        console.log('se grabaron los cambios');

    }


    reiniciarConteo(){
        
        this.ultimo = 0
        
        this.tickets = [];

        this.ultimos4 = [];

        console.log('se inicializo la app');

        this.grabarArchivo();
    }

};

module.exports = {
    TicketControl
};