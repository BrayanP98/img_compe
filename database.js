const { connect }=require('mongoose');


(async() => {
    

     try{


const db =await connect("mongodb+srv://root:8L1GYG6Olx9fz3tJ@cluster0.vbjahf5.mongodb.net/?retryWrites=true&w=majority");
 //  const db =await connect("mongodb://localhost/usuarios");

        console.log("db connected");

     }catch(error){
        console.error(error);

        
     }
})()
