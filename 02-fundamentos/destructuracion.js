let batman = {
    nombre: 'Bruce',
    apellido: 'Wayne',
    poder: 'dinero',
    getNombre: function() {
        return `Batman es: ${this.nombre} ${this.apellido} y su poder es ${this.poder}`
    }
}

// console.log(batman.getNombre());

// let nombre = batman.nombre;
// let apellido = batman.apellido;
// let poder = batman.poder;

let {nombre:batNom, apellido:batApe, poder:batPod} = batman;

console.log(batNom, batApe, batPod);