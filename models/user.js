const mongoose = require('mongoose')

UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    tipo: String,
    horario: String,
});

module.exports = mongoose.model("User", UserSchema);