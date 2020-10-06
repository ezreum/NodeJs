const argv = require('./config/yargs').argv;
var colors = require('colors/safe');


const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar.js');
let comando = argv._[0]


switch ( comando ) {
    case 'listar':
        listarTabla(argv.base, argv.limite)
        .then( (archivo)  => {
            console.log(archivo.blue);
        }).catch((err) => {
            console.log(err.red);
        });
        break;

    case 'crear':
        crearArchivo(argv.base, argv.limite)
        .then( (archivo)  => {
            console.log(colors.rainbow(archivo),` creado con éxito`);
        }).catch((err) => {
            console.log(err);
        });
        break;
    
    
    default:
        console.log('comando no reconocido');
        break;
}

// let parametro = argv[2];

// let base = parametro.split('=')[1];

// console.log(base);

// crearArchivo(base)
// .then( (archivo)  => {
//     console.log(`${archivo} creado con éxito`);
// }).catch((err) => {
//     console.log(err);
// });
