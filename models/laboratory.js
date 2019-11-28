const mongoose = require('mongoose'),
LaboSchema = new mongoose.Schema({
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