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
        required:false,
        unique:false,
    }, 
     tocken:{

        type:String,
        required:false,
        unique:false,
    }, 
  favicon:{
       
       
            type:String
        
    }, 
    

     done: Boolean,},{
        timestamps:true,
        versionKey:false
     
});

module.exports=model('general', generalSchema);
