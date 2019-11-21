const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
  
    password: {
        type: String,
        required: true
    },

    tipo:String,

    horario:String,
    
});

module.exports = mongoose.model("User", UserSchema);