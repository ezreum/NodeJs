const opts ={
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
}

const argv = require('yargs')
    .command('listar','Imprime en consola la tabla de multiplicar',opts)
    .command('crear','Crea una tabla de multiplicar en la carpeta multiplicar',opts).help()
    .argv;

module.exports = {
    argv
}