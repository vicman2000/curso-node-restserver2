
const { Schema, model } = require('mongoose');

const UsuarioSchema =  Schema({
    nombre:{
        type: String,
        required: [true, "El Nombre de la persona es obligatorio"]
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true    
    },
    google: {
        type: Boolean,
        default: false
    }
});


// Sobreescritura de un metohodo para que no se muestra la clave en el resultado de insertar nuevo usuario
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario} = this.toObject(); /**Omite mostrar los campos version y password */
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);