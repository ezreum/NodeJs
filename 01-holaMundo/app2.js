function saludar( datos ) {
    let mensaje = `Hola ${ datos }`;
    return mensaje;
}

let saludo = saludar('Rubén');

console.log(saludo);