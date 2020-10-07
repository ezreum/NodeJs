
const fs = require('fs');

let guardarArchivo = (descripcion, completado=false) => {
    return new Promise( (resolve, reject) => {
        console.log('creando tarea');
        
        if (descripcion!=undefined && descripcion!=null && descripcion!='') {
            fs.writeFile('./db/data.json', descripcion, (err) =>{
                if (err) throw new Error(err);
                else resolve();
            });
        } else {
            reject('intoduce una descripcion valida');
        }
    })

}

let listarTareas = (tareas) => {
    return new Promise( (resolve, reject) => {
        console.log('leyendo tareas');
        
        if (tareas!=undefined && tareas!=null && tareas!='') {
                    resolve(tareas);
        } else {
            reject('no existen tareas');
        }
    })

}

let actualizarTareas = (descripcion, confirmado) => {
    return new Promise( (resolve, reject) => {
        console.log('creando archivo');
        
        if (descripcion!=undefined && descripcion!=null && descripcion!='') {
            if (descripcion!=undefined && descripcion!=null && descripcion!='') {
                resolve(descripcion);
            } else {
                reject('intoduce un descripcion valido');
            }
        } else {
            reject('intoduce un descripcion valido');
        }
    })

}
//, listarTareas, actualizarTareas
module.exports={
    guardarArchivo,
    listarTareas,
    actualizarTareas
}