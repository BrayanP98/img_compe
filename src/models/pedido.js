const {Schema, model} = require('mongoose');
const bcrypt =require( "bcrypt");

const saltRounds=10;

const taskSchema= new Schema({
    status:{
        
        type:String,
        required:false

    },
   dataUser:{
   
  nombre:{
        
        type:String,
        required:true

    },
nombreUser:{
        
        type:String,
        required:true

    },
    direccion:{
        
      type:String,
      required:false

  },
  telefono:{
        
   type:String,
   required:false

},
    email:{
        
        type:String,
        required:false

    },
    

    },
pedido:[{
            
    nombreProd:{
        type:String,
        required:false    },

     valor:{
        type:String,
        required:false
     },
     cantidad:{
        type:String,
        required:false
     },


},],
     
     done: Boolean,},{
        timestamps:true,
        versionKey:false
     
});



module.exports=model('pedido', taskSchema);
