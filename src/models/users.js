const {Schema, model} = require('mongoose');
const bcrypt =require( "bcrypt");

const saltRounds=10;

const taskSchema= new Schema({
    
    nombre:{
        type:String,
        unique:true,
        required:true

    },
     password:{
        type:String,
        required:true
     },
    carro:[{
            

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

taskSchema.pre('save', function(next){

    if(this.isNew || this.isModified('password')){
        
            const document=this;
            bcrypt.hash(document.password, saltRounds,(err, hashedPassword)=>{
                if(err){

                    next(err);
                }
                else{

                    document.password=hashedPassword;
                    next();
                }

            })
    }else{
        next();
    }
})

taskSchema.methods.generatePassword=function(password){

    return bcrypt.hashSync(password, bcrypt.genSalt(8), null)
}
taskSchema.methods.validatePassword= function(password){


    return bcrypt.compareSync(password, this.password);
}
taskSchema.methods.isCorrectPassword=  function(password, callback){

    bcrypt.compare(password, this.password,  function(err, same){

        if(err){
            callback(err);
        }else{

            callback(err, same);
        }
    })
};



module.exports=model('usuario', taskSchema);
