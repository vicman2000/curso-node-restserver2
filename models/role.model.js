const { Schema, model } = require('mongoose');

const RoleSchema =  Schema({
    rol:{
        type: String,
        required: [true, "El Nombre del rol es obligatorio"]
    },
});

module.exports = model('Role',RoleSchema);