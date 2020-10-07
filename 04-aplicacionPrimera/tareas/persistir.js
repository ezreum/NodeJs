const fs = require('fs');
const { guardarArchivo, listarTareas } = require('../config/util');

let listadoTareas = [];

const crear = (descripcion) => {
    
    listadoTareas = cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    
    listadoTareas.push(porHacer);

    

    return porHacer;
}

const guardarDB = () =>{
    let data = JSON.stringify(listadoTareas);
    return data;
}

const cargarDB = () =>{
    try {
        listado = require('../db/data.json');
    return listado;
    } catch (error) {
        listado = [];
    }
    
}

const actualizarTarea = (descripcion, completado = true) =>{
    listadoTareas = cargarDB();
    let index = listadoTareas.findIndex( tarea => tarea.descripcion === descripcion); 
    if (index >= 0) {
        listadoTareas[index].completado = completado;
        jason  = guardarDB();
        
        guardarArchivo(jason);
        return true;
    } else {
        return false;
    }
}

const borrarTarea = (descripcion) =>{
    listadoTareas = cargarDB();
    let index = listadoTareas.findIndex( tarea => tarea.descripcion === descripcion); 
    if (index >= 0) {
        listadoTareas.splice(index,1);
        jason  = guardarDB();
        guardarArchivo(jason);
        return true;
    } else{
        return false;
    }
}

module.exports = {
    crear,
    guardarDB,
    cargarDB,
    actualizarTarea,
    borrarTarea
}