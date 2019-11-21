const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LaboSchema = Schema({
    Numero: {
        type: BigInt,
        required: true,
    },
  
    puestos: {
        type: BigInt,
        required: true
    },  
});

module.exports = mongoose.model("Laboratory", LaboSchema);