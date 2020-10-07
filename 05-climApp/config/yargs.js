const opts ={
    direccion: {
        alias: 'd',
        default: 'Consulte la documentación',
        demand: true,
        desc: 'La direccion de la ciudad en la que quieres ver el tiempo'
    }
}
const argv = require('yargs').options({
    direccion: opts.direccion,
}).help().argv;

module.exports = {
argv
}