
const axios = require('axios');

const getLatLong = async (direccion) =>{

const encoderUrl = encodeURI(direccion);
const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?q='+encoderUrl+'&appid=1472d27cb964e99acc7a262714d6c906'
  });

  const resp = await instance.get();
  
  if (resp.data.length === 0) {
      throw new Error('No se obtuvieron resultados para '+direccion);
  }
//   console.log(resp.data);
  
  const lugar = resp.data.name;
  const latitud = resp.data.coord.lat;
  const longitud = resp.data.coord.lon;
  
  return{
    lugar,
    latitud,
    longitud
  }
} 


module.exports={
getLatLong
};