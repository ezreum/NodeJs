

// objeto global que se actualiza dependiendo al entorno
//process

//puerto defecto sino 3000
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//ruta local
//mongodb://localhost:27017/cafe
// remota mongodb+srv://user:pwd@cluster0.ubyle.mongodb.net/cafe

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


// vencimiento del token
// 60 seg * 60 min *24 horas *30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//seed
process.env.SEED = process.env.SEED || 'este es el seed de desarrollo';

process.env.CLIENT_ID = process.env.CLIENT_ID || '784188324049-1593kl4pimrajqrogoe8psoejpgg1vjg.apps.googleusercontent.com';