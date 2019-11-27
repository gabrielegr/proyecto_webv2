const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReserveSchema = Schema({
    laboratorio: {
        type: String,
        required: true,
    },
  
    usuario: {
        type: String,
        required: true
    },

    horai: {
        type: String,
        required: true
    },

    horaf: {
        type: String,
        required: true
    },
    
    fecha: {
        type: Date,
        required: true
    },

    cantidad:Number,

    estado: Boolean,

    descripcion: String,

    frecuencia: String,

    materia: String,
});

module.exports = mongoose.model("Reserve", ReserveSchema);