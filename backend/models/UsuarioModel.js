const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema(
    {
        nombre: String,
        apellidos: String,
        correo: String,
        password: String,
        type: String
    });

    module.exports = mongoose.model('usuarios', UsuarioSchema); 