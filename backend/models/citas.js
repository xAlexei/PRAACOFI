const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitasSchema = new Schema({
    nombre: String,
    apellidos: String,
    motivo: String,
    rfc: String
});

module.exports = mongoose.model('citas', CitasSchema);