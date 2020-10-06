// function sumar(a, b) {
//     return a+b;
// }

// let sumar = (a, b) =>  a+b;

// console.log(sumar(10, 20));

// function saludar() {
//     return `Hola mundo`;
// }
let saludar = (nombre) => `Hola ${nombre}`;
console.log(saludar('Alejandro'));

let batman = {
    nombre: 'Bruce',
    apellido: 'Wayne',
    poder: 'dinero',
    getNombre: function() {
        return `Batman es: ${this.nombre} ${this.apellido} y su poder es ${this.poder}`
    }
}

console.log(batman.getNombre());
