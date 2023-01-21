
const { Router } = require('express');
const { check } = require('express-validator');

const  { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost
    , usuariosDelete, usuariosPatch, usuariosGetbyParams 
    } = require('../controllers/usuarios.controller');

const router = Router();

// lectura de registros
router.get("/", usuariosGet);



router.get("/params", usuariosGetbyParams);

// Actualizar un registro
router.put("/:id", [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);


// Insertando nuevos registros
router.post("/",[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('password','El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),  
    //check('rol','El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuariosPost);

// Eliminar registro
router.delete("/:id",[
    validarJWT,
    //esAdminRole,
    tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);


router.patch("/", usuariosPatch);

  
    


module.exports = router;