const bcrypt=require('bcrypt-nodejs')
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = Schema({
    
    email:{
        type:String,
        required:true
    },
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
    
}

);

UserSchema.methods.generateHash= function(password){
return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

UserSchema.methods.validatePassword=function(password){
return bcrypt.compareSync(password,this.local.password);
};

module.exports = mongoose.model("User", UserSchema);