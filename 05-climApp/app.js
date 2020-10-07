const argv = require('./config/yargs').argv
//const peticion = require('request');

const punto = require('./clima/clima');
let direccion = argv.direccion;

punto.getClima(direccion)
.then((result) => {
    console.log(result);
    // console.log(`El clima de ${result.lugar} es de ${result.temperatura}`);
}).catch((err) => {
    console.log('No se pudo determinar el clima de: '+direccion);
});





//   {
//     coord: { lon: -3.7, lat: 40.42 },
//     weather: [
//       { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }
//     ],
//     base: 'stations',
//     main: {
//       temp: 295.52,
//       feels_like: 295.53,
//       temp_min: 294.82,
//       temp_max: 296.15,
//       pressure: 1025,
//       humidity: 49
//     },
//     visibility: 10000,
//     wind: { speed: 0.5, deg: 360 },
//     clouds: { all: 20 },
//     dt: 1602071976,
//     sys: {
//       type: 1,
//       id: 6421,
//       country: 'ES',
//       sunrise: 1602051445,
//       sunset: 1602092841
//     },
//     timezone: 7200,
//     id: 3117735,
//     name: 'Madrid',
//     cod: 200
//   }
  