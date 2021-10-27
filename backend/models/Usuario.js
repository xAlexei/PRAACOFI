const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema(
    {
        nombre: String,
        apellidos: String,
        correo: String
    });

    module.exports = mongoose.model('usuarios', UsuarioSchema);