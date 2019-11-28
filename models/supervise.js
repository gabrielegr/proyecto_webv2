const mongoose = require('mongoose'),
SuperviseSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
    },

    fecha:{
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("Supervise", SuperviseSchema);