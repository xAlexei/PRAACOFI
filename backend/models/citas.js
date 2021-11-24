const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitasSchema = new Schema({
    nombre: String,
    apellidos: String,
    motivo: String,
    fecha_cita: Date,
    hora: Number,
    area: String,
    rfc: String
});


module.exports = mongoose.model('citas', CitasSchema);