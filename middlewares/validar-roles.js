const { request, response  } = require("express");


const esAdminRole = ( req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el Role sin validar el token primero..'
        });
    }  

    // Desestructurar
    const { rol, nombre } = req.usuario;

    // Validar que solo el rol de administrador pueda eliminar registros
    if (rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - Persona no Autorizada`
        });
    }


    next();
}

const tieneRole = ( ...roles ) =>{
    //console.log( roles );

    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el Role sin validar el token primero..'
            });
        }  

        if(!roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }

}



module.exports = {
    esAdminRole,
    tieneRole
}