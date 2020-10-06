let empleados = [
    {
        id:1,
        nombre:'Pepe',
    },
    {
        id:2,
        nombre:'Laura',
    },
    {
        id:3,
        nombre:'Juan',
    }

];

let salarios = [
    {
        id:1,
        cantidad:1000,
    },
    {
        id:2,
        cantidad:2000,
    }

];


let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id)
    if (empleadoDB==undefined) {
        callback('El usuario no existe');
    } else{
        callback(null,empleadoDB);
    }
    
    }

// getEmpleado(1,(err,empleado) => {
//     if (err) {
//         console.log(err);
//     } else {
        
//     console.log(empleado);
//     return empleado;
//     }
// });
let emple1;
getEmpleado(1,(err,empleado) => {
    if (err) {
        console.log(err);
    } else {
        
    console.log(empleado);
    emple1 = empleado;
    }
});


let getSalario = (empleado, callback) => {
    let dinero = salarios.find(salario => salario.id === empleado.id);
    if (dinero==undefined) {
        empleado!=null?callback('El usuario '+empleado.nombre+' no tiene un salario asignado',empleado):callback('El usuario no existe');        
    } else{
        let arreglo = [];
        arreglo['empleado']=empleado;
        arreglo['salario']=dinero;
        callback(null,arreglo
         );
    }
    }

if (emple1!=null && emple1!=undefined) {
    getSalario(emple1,(err,salario) => {
        if ( err ) {
            console.log(err);
        } else{
            console.log(salario['empleado']['nombre']+' cobra '+salario['salario']['cantidad']+' euros al mes');
        }
    });
} else {
    
}
