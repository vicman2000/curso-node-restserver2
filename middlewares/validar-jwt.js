const { response, request } = require("express");
const jwt = require ("jsonwebtoken");

const Usuario = require('../models/usuario.model');

const validarJWT = async( req = request, res = response, next) =>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    
    
    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);        

        console.log( uid );
        // Leer el usuario que corresponde al UID
        const usuario = await Usuario.findById( uid );
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe en BD'
            })           
        }

        // valida que usuario este activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado false'
            })
        }



        req.usuario = usuario;


        next();        


    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}


module.exports = {
    validarJWT
}