//crear cmd para crear, listar y actualizar

const argv = require('./config/yargs').argv
const colors = require('colors').argv

const { guardarArchivo, listarTareas, actualizarTareas } = require('./config/util.js');
const { cargarDB } = require('./tareas/persistir.js');
let comando = argv._[0];
const pendientes = require('./tareas/persistir.js'); 
switch ( comando ) {
    case 'crear':
        console.log('lista de tareas por crear');
        let tarea = pendientes.crear(argv.descripcion);
        tarea = pendientes.guardarDB(tarea);
        guardarArchivo((tarea)).then( (archivo) =>{
            console.log('La tarea se almacenó correctamente');
        })
        .catch( (err) =>{
            console.log(err);
        } );
        break; 

    case 'actualizar':
        console.log('lista de tareas por actualizar');
        console.log(argv.completado);
        let actualizado = pendientes.actualizarTarea(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
        
    case 'listar':
        console.log('lista de tareas por hacer');
        
        listarTareas( cargarDB() )
        .then( (tareas) => {
            console.log('=========Pendientes========'.green);
            for (var tarea of tareas) {
                
                console.log(tarea.descripcion);
                console.log('completado: '+tarea.completado);
                console.log('==========================='.green);
            }
            console.log('======Fin de la lista======'.green);
        })
        .catch( (err) =>{
            console.log(err);
        } );
        break;
        
        case 'borrar':
        console.log('lista de tareas por borrar');
        
        let borrado = pendientes.borrarTarea(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando desconocido');
        break;
}