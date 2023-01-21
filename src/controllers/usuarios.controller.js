
const { response, request } = require('express'); /**Linea obligada para controllers*/
const bcryptjs = require('bcryptjs');
const usuarioModel = require('../../models/usuario.model');


const usuariosGet = async(req = request, res = response) => {
   
    const { limite = 5, desde = 0 } = req.query;
    const filtro = { estado: true};


    // const usuarios = await usuarioModel.find( filtro )
    // .limit( Number(limite))
    // .skip( Number(desde) );
    // const totalRegistros = await usuarioModel.countDocuments( filtro );


    // Aplicando una mejora en rtiempos de consulta .. haciendo que se ejecuten los procesos
    //al mismo tiempo
    const [totalRegistros, usuarios] = await Promise.all([
        usuarioModel.countDocuments(filtro),
        usuarioModel.find(filtro)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    
      res.json({
          msg: 'get API - Controlador v',
          "Total de Registros": totalRegistros ,
          usuarios
      })



}

const usuariosGetbyParams = (req, res) => {
    
    const  { q, nombre = 'No name', page = 1, limit=10 } = req.params;

   
      res.json({
          msg: 'getbyParams API - Controlador con parametros en la Url',
          q,
          nombre,
          page,
          limit
      })
}

const usuariosPut = async(req, res = response)  => {
    const id = req.params.id;

    // Omito los campos de Password y google para que no sean modificados
    const { password, google, correo, ...resto } = req.body;

    // TODO Validar contra base de datos

    // Si el uusario coloco valor en el password, es que si desea cambiarlo 
    // y hay que encriptar nuevamente para poder actualizarlo
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await usuarioModel.findByIdAndUpdate( id, resto);


    res.status(200).json(usuario)
};

  
const usuariosPost = async (req, res) => {
    const { nombre, correo, password , rol } = req.body;
    const usuario = new usuarioModel( { nombre, correo, password , rol });
   
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();
    
      res.status(201).json({
          msg: 'post API desde controlador',
        //   nombre: nombre,
        //   edad: edad
        usuario
      })
};
  

// Proceso para eliminar registro
const usuariosDelete = async(req, res = response) => {
    const { id }  = req.params;
    

    // // Borrarde forma física el eregistro
    // const usuario = await usuarioModel.findByIdAndDelete(id);

    // Borrado lógico
    const usuario = await usuarioModel.findByIdAndUpdate(id, {estado: false} )
    const usuarioAutenticado = req.usuario;

      res.json({
          msg: `Registro con id: ${id} ha sido eliminado`,
          usuario,
          usuarioAutenticado
      })
  };
  


const usuariosPatch = (req, res) => {
      res.json({
          msg: 'patch API - desde controlador',

      })
};






module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosGetbyParams
}