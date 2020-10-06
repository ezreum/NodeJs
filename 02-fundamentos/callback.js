// setTimeout( function name(params) {
//     console.log('Hola mundo');
// }, 3000
// );

let getUsuarioById = (id, callback) => {

    let usuario = {
        nombre: 'Pepe',
        id
    }

    if (id === 20) {
        callback(`El usuario ${ id }, no existe`);
    } else{
    callback(null,usuario);}
}

getUsuarioById(1, (err, usuario)  =>{

    if (err) {
        return console.log(err);
    }
    else{
        console.log('Usuario de BD', usuario);
    }
});