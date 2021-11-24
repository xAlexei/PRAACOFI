const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ["CONTADOR"],
    message: '{VALUE} no es un role válido'
}

let Schema = mongoose.Schema;

let contadorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password: {
        type: String,
        required: [true, "Le contraseña es obligatoria"],
    },
    role: {
        type: String,
        default: 'CONTADOR',
        required: [true],
        enum: rolesValidos,
    },
});

// elimina la key password del objeto que retorna al momento de crear un contador
contadorSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

contadorSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('Contador', contadorSchema)

