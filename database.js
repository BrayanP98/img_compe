const { connect }=require('mongoose');


(async() => {
     try{
<<<<<<< HEAD


    //  const db =await connect( "mongodb://mongo:fweEbYTfnZTEU5gjnM0Q@containers-us-west-141.railway.app:7794");


const db =await connect( "mongodb://mongo:fweEbYTfnZTEU5gjnM0Q@containers-us-west-141.railway.app:7794");
  
        //  const db =await connect("mongodb://localhost/usuarios");
=======
        //    const db =await connect("mongodb://localhost/usuarios");
>>>>>>> 37d75bc859083bf4a03da91757c394bc6827b205

  // const db =await connect( "mongodb://mongo:fweEbYTfnZTEU5gjnM0Q@containers-us-west-141.railway.app:7794");
  
     const db =await connect("mongodb://localhost/db_competidor");
        console.log("db connected");

     }catch(error){
        console.error(error);

        
     }
})()
