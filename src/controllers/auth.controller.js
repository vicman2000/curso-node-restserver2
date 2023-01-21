const { response } = require("express");
const { bcryptjs } = require("bcryptjs");

const Usuario = require('../../models/usuario.model');
const { generarJWT } = require("../../helpers/generar-jwt");

const login = async(req, res = response) =>{

    const { correo, password } = req.body;

    try {

        // Buscamos el usuario  utilizando el correo, ya que solo debe existor una sola vez
        const usuario = await Usuario.findOne({ correo });

        //Verificar si el email existe
        if ( !usuario ) {
           return  res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //Verificar si el usuario esta activo
        if ( !usuario.estado ) {
           return  res.status(400).json({
                msg: 'Usuario / dado de baja - estado: false'
            })
        }


        // // Verificar la contraseña
        // const validPassword = bcryptjs.compareSync( password, usuario.password);
        // if (!validPassword) {
        //     return  res.status(400).json({
        //          msg: 'Usuario / Password no son correctos - password'
        //      })
        //  }
 


        // Generar el jwt
        const token = await generarJWT( usuario.id );

        res.json({
            msg: "Login Ok",
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error al autenticar, por favor hable con el administrador",
            error
            
        })
        
    }

}

module.exports = {
    login
}