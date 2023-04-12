const { connect }=require('mongoose');


(async() => {
    

     try{


    //  const db =await connect( "mongodb://mongo:fweEbYTfnZTEU5gjnM0Q@containers-us-west-141.railway.app:7794");

   const db =await connect( "mongodb://mongo:fweEbYTfnZTEU5gjnM0Q@containers-us-west-141.railway.app:7794");
  
//const db =await connect("mongodb://localhost/db_competidor");

        console.log("db connected");

     }catch(error){
        console.error(error);

        
     }
})()
