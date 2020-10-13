

// objeto global que se actualiza dependiendo al entorno
//process

//puerto defecto sino 3000
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//ruta local
//mongodb://localhost:27017/cafe
// remota mongodb+srv://ezreum:pwd@cluster0.ubyle.mongodb.net/cafe

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://ezreum:897qSCZocU2TPVSV@cluster0.ubyle.mongodb.net/cafe';
}

process.env.URLDB = urlDB;