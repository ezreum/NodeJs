

 
const opts ={
    descripcion: {
        alias: 'd',
        default: 'Consulte la documentación',
        demand: true,
        desc: 'Descripcion de la tarea'
    },
    completado: {
        alias: 'c',
        default: true,
        desc: 'marca como completado o pendiente la tarea'
    }
}
const argv = require('yargs')
.command('crear','origina un elemento',opts)
.command('actualizar','modifica un objeto ya existente',opts)
.command('listar','lista los objetos existentes en la app',opts)
.command('borrar','borra un objeto ya existente',opts).help()
.argv;

module.exports = {
argv
}