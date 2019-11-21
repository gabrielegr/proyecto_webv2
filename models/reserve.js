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
        type: Timestamp,
        required: true
    },

    horaf: {
        type: Timestamp,
        required: true
    },
    
    fecha: {
        type: Date,
        required: true
    },

    cantidad:BigInt,

    estado: Boolean,

    descripcion: String,

    frecuencia: String,
});

module.exports = mongoose.model("Reserve", ReserveSchema);