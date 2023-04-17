const {Schema, model} = require('mongoose');

const generalSchema= new Schema({
    numWhatsapp:{
        type:String,
        required:true,
        unique:true,
        trim:true
           },
   color:{
        type:String,
        required:true,
        unique:false,
    }, 
    

     done: Boolean,},{
        timestamps:true,
        versionKey:false
     
});

module.exports=model('general', generalSchema);
