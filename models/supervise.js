const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SuperviseSchema = Schema({
    usuario:{
        type: String,
        required: true,
    },
    
    hinicio:{
        type: String,
        required: true,
    },
  
    hfin: {
        type: String,
        required: true,
    },  

    laboratorio:{
        type: BigInt,
        required: true,
    },

    fecha:{
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("Supervise", SuperviseSchema);