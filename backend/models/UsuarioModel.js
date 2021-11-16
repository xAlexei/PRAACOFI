const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema(
    {
        nombre: String,
        apellidoP: String,
        apellidoM: String,
        correo: String,
        password: String,
        type: String
    });

    module.exports = mongoose.model('usuarios', UsuarioSchema); 