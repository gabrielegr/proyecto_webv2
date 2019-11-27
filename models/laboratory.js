const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LaboSchema = Schema({
    Numero: {
        type: Number,
        required: true,
    },
  
    puestos: {
        type: Number,
        required: true
    },  
});

module.exports = mongoose.model("Laboratory", LaboSchema);