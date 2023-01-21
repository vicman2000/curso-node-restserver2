
const { validationResult } = require('express-validator');


/**Validación de campos */
const validarCampos = ( req, res, next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors
        })
    }

    next();


}

module.exports = {
    validarCampos
}