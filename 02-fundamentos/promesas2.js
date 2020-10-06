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

let emple;

let getEmpleado = (id) => {

    return new Promise( (resolve, reject) =>{

        let empleadoDB = empleados.find(empleado => empleado.id === id)
            if (empleadoDB==undefined) {
                reject('El usuario no existe');
            } else{
                resolve(empleadoDB);
            }

    } );
}

let getSalario = (empleado ) => {
    return new Promise( (resolve, reject) => {
        
            let salario = salarios.find(salario=>salario.id===empleado.id);
            if (salario==undefined) {
                reject('El empleado '+empleado['nombre']+ ' no tiene un salario asignado');
            } else {
                resolve('El empleado '+empleado['nombre']+ ' tiene un salario de '+salario['cantidad']);
            }
    });
}

getEmpleado(3).then( empleado => {
    
    return getSalario(empleado);

})
.then(resp => {
    console.log(resp);
})
.catch(err => {
    console.log(err);
})

