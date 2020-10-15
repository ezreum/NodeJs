// verificador de tokens

const jwt = require('jsonwebtoken');

let verificarToken = ( req, res, next ) => {
    
    let token = req.get('auth');
    
    jwt.verify( token, process.env.SEED, (err,decoded) =>{

        if ( err ) {
            return res.status(401).json({
                ok: false,
                message: 'token no valido'
            })
        } else {
            req.usuario = decoded.usuario;
        }

        next();

    } );

};

let verificarRol = (req,res,next) =>{

    let usuario = req.usuario

    if (usuario.rol!='ADMIN_ROL') {
        return res.status(401).json({
            ok: false,
            message: 'No posee los privilegios necesarios'
        })
    }
    next();
};

//verifica token en url
let verificaTokenImg = (req, res, next) =>{

    let token = req.query.token;
    jwt.verify( token, process.env.SEED, (err,decoded) =>{

        if ( err ) {
            return res.status(401).json({
                ok: false,
                message: 'token no valido'
            })
        } else {
            req.usuario = decoded.usuario;
        }
    })
        next();
};


module.exports = {
    verificarToken,
    verificarRol,
    verificaTokenImg
};