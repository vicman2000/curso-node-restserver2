
/**Middleware personalizado */
const validacionCampos  = require('../middlewares/validar-campos'); 
const validacionJWT   = require('../middlewares/validar-jwt');
const validacionRoles = require('../middlewares/validar-roles');


module.exports = {
    ...validacionCampos,
    ...validacionJWT,
    ...validacionRoles
}