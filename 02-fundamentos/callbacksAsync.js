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


// let getEmpleado = (id) => {

//     return new Promise( (resolve, reject) =>{

//         let empleadoDB = empleados.find(empleado => empleado.id === id)
//             if (empleadoDB==undefined) {
//                 reject('El usuario no existe');
//             } else{
//                 resolve(empleadoDB);
//             }

//     } );
// }

let getEmpleado = async (id) => {

        let empleadoDB = empleados.find(empleado => empleado.id === id)
        if (empleadoDB==undefined) {
            throw new Error('El usuario no existe');
        } else{
            return empleadoDB;
        }
}

let getSalario = async (empleado) => {
    
        if (!empleado) {
            throw new Error('el empleado no existe')
        } else {
            let salario = salarios.find(salario=>salario.id===empleado.id);
            if (salario==undefined) {
                return({
                    nombre: empleado.nombre,
                    mensaje: 'El empleado X no tiene todavía un salario asignado',
                    posicion: true
                });
            } else {
                return {
                    nombre: empleado.nombre,
                    salario: salario.cantidad,
                    id: empleado.id,
                    mensaje: 'Y tiene un salario asignado de & euros'
            }
            
        }
    }
}

// getEmpleado(2).then( empleado => {
//     console.log('Empleado de la DB ',empleado);
    
//     getSalario(empleado).then( salario => {
//         let res = salario['mensaje'].replace(/Y/,salario['nombre']);
//             res = res.replace(/\&/,salario['salario']);
//             console.log(res);
//     }, (err) => {
//         if (!err['posicion']) {
//             let res = 'No existe el usuario';
//             console.log(res);
//         } else {
//             let res = err['mensaje'].replace(/X/,err['nombre']);
//             console.log(res);
//         }
//     } );

// }, (err) => {
// console.log(err);
// }  );

let getInformacionEmpleado = async (id) => {
    let empleado = await getEmpleado(id);
    let salario = await getSalario(empleado);
    return {
        empleado: empleado,
        salario:salario
    };
};

let res;

getInformacionEmpleado(3)
    .then(arreglito => {
    if (arreglito['posicion']){
    console.log(arreglito.empleado.nombre+' no tiene un salario asignado');
    } else {
    res = arreglito.salario['mensaje'].replace(/Y/,arreglito.empleado['nombre']); 
    res = res.replace(/\&/,arreglito.salario['salario']);
    console.log(res);
    }
    })
    .catch( (e) => {
        console.log('a');
        if (!e['posicion']) {
                console.log(e+'b');
        } else {
            let res = e['mensaje'].replace(/X/,e['nombre']);
            console.log(res+'a');
                    }
    }
);
