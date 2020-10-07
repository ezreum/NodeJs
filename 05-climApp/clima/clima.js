const axios = require('axios');

const getClima = async (direccion) =>{

    const encoderUrl = encodeURI(direccion);
    const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather?q='+encoderUrl+'&appid=1472d27cb964e99acc7a262714d6c906&units=metric')
        
      const lugar = resp.data.name;
      const latitud = resp.data.coord.lat;
      const longitud = resp.data.coord.lon;
      const temperatura = resp.data.main.temp;
      const max = resp.data.main.temp_max;
      const min = resp.data.main.temp_min;
      return{
        lugar,
        latitud,
        longitud,
        temperatura,
        max,
        min
      }
    
    //   console.log(resp.data);
    } 

module.exports = {
    getClima
}
