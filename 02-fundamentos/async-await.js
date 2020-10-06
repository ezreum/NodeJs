/*
 * Async Await
*/

// let getNombre = async(nombre) => {
//     if ( nombre === ''|| nombre===undefined || nombre===null) {
//         throw new Error('No existe un nombre para ese usuario');
//     } else {
//     return nombre;
//     }
// }

// getNombre('s').then(nombre => {
//     console.log(nombre)
// })
// .catch( e =>{
//     console.log('error de ASYNC', e);
// });


////////////
// let getNombre = (nombre) => {
//     return new Promise( ( resolve, reject ) => { 

//         setTimeout( () => {
//             resolve(nombre);
//         }, 3000 );

//         if (nombre==undefined) {
//             reject('introduce un nombre válido');
//         }

//     })
//     }

// getNombre('Juana').then(nombre => {
//     console.log(nombre);
// })
// .catch(e => {
//     console.log('error '+e);
// })

////////
let saludo = async(nombre) => {
    if ( nombre === ''|| nombre===undefined || nombre===null) {
        throw new Error('No existe un nombre para ese usuario');
    } else {
    return 'Hola '+nombre;
    }
}

saludo('frolo').then(mensaje => {
        setTimeout( () => console.log(mensaje) ,3000);
    })
    .catch(e => {
        console.log('error '+e);
    })