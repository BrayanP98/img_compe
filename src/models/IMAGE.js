const {Schema, model} = require('mongoose');

const imagSchema= new Schema({
    cantidad:{
        type:String,
        required:true,
        unique:false,
        trim:true
           },
    categoria:{
        type:String,
        required:true,
        unique:false,
    },
    codigo:{
        type:String,
       
        unique:true,
        trim:true

    },
    nombre:{
        type:String,
       
        unique:true,
        trim:true

    },
    valor:{
        type:String,
        required:true,
        trim:true

     },
    descripcion:{
        type:String,
        required:true },

   

    imagen:{
        type:String
    },

     done: Boolean,},{
        timestamps:true,
        versionKey:false
     
});

module.exports=model('product', imagSchema);











