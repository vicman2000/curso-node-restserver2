const RoleModel = require('../models/role.model');
const UsuarioModel = require('../models/usuario.model');


/** Valida si el Rol es valido */
const esRolValido = async(rol = '') => {
    const existeRol = await RoleModel.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no existe en la BD`);
    }
}


 // verificar si el correo existe
const emailExiste = async( correo = '') =>{  
    const existeEmail = await UsuarioModel.findOne({ correo });
    if (existeEmail)
    {
        throw new Error(`El correo ${ correo } ya existe en la BD`);
    }
    }


 // verificar si el correo existe
 const existeUsuarioPorId = async( id ) =>{  
    const existeUsuario = await UsuarioModel.findById(id);
    if ( !existeUsuario )
    {
        throw new Error(`El ID ${ id } No existe en la BD`);
    }
    }


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}
