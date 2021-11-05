const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitasSchema = new Schema({
    nombre: String,
    apellidoP: String,
    apellidoM: String,
    motivo: String,
    RFC: String
});

module.exports = mongoose.model('citas', CitasSchema);