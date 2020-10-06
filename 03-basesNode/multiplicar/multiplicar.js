//requireds
const fs = require('fs');
var colors = require('colors');
let crearArchivo = (base, limite=10) =>{

    return new Promise( (resolve,reject) =>{
        let contenido='';
        if (!Number(base) ) {
            reject('el valor introducido no es un número');
            return;
        }
        
        
        for (let i = 1; i <= limite; i++) {
            contenido += base+` * `+i+' = '+i*base+'\n';
        }
        let titulo = 'multiplicar/tabla'+base+'.txt';
            fs.writeFile(titulo, contenido, (err) => {
                if (err) reject(err);
                else resolve(titulo.slice(12));
            
            })
        })
    }


    let listarTabla = (base, limite=10) =>{

        console.log('=============='.red);
        console.log(`tabla del ${base}`.blue);
        console.log('=============='.green);
        

        return new Promise( (resolve,reject) =>{
            let contenido='';
            if (!Number(base) ) {
                reject('el valor introducido no es un número');
                return;
            }
            
            
            for (let i = 1; i <= limite; i++) {
                contenido += base+` * `+i+' = '+i*base+'\n';
            }
            resolve(contenido);
                
                
            })
        }
    

module.exports={
    crearArchivo,
    listarTabla
}