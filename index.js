const express= require('express');
require('dotenv').config()
const config= require('./config')
const path= require('path');
const morgan= require('morgan');
const multer = require('multer')
const uuid1=require('uuid');
const flash = require("connect-flash");
const cookieParser =require("cookie-parser");
const session= require("express-session");
const bodyParser =require("body-parser");
const passport = require('passport');
const Image=require('./src/models/users')
const ls = require('local-storage');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
require('./database');

const app= express();
const store= new session.MemoryStore;

////
const http = require('http');
const { findById } = require('./src/models/IMAGE');
var server = require("http").Server(app);
var io = require("socket.io")(server);

//////int express
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({

  cookie:{ maxAge:24*60*60*1000},
  secret:'brayanp',
  resave: true,
  store:store,
  saveUninitialized:true
}));

app.use(passport.initialize());

app.use(passport.session());
app.use(flash());

///setings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, './src/views'));
//app.set('view engine','ejs');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.set('view engine', 'ejs');
////middelware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage= multer.diskStorage({
  //  destination: path.join(__dirname, 'public/img/uploads'),
    
    filename:(req, file, cb, filename) => {
        cb(null, uuid1.v4()+ path.extname(file.originalname));
    }
});

app.use(express.static(path.join(__dirname,"public")));
const upload = app.use(multer( {
   limits:(req,err, next)=>{
    
    fileSize:1000000

return err},
    storage:storage}).single('image'));




////routes

app.use(require('./src/routes/index_routes'));

 
  


////server
//var notes=["sss","www"]
io.on("connection", function (socket) {
  
  

  socket.on("idUser", function (nombre, carro) {
    const img=new Image();
    const prods= async()=>{
      const notes1= await Image.findById({_id:nombre});
      
     // notes1.carro.product2=carro
    // notes1.save();
  //console.log(notes1.carro);

      socket.emit("loadates",notes1.carro)
    
    }
   prods();
    
  });
  socket.on("deleteprod", function (nombre, id) {
    const deleteprod= async()=>{
      
      const notes= await Image.findOne({nombre});
     
      let item_del= notes.carro.filter((item) =>item._id !=id)
      
     await notes.updateOne({carro:item_del})
    
     socket.emit("loadates",item_del)
    
    }
   deleteprod()
  
  })
  socket.on("sendprod", function (nombre, carro) {

    const img=new Image();
    const prods= async()=>{
      const notes= await Image.findOne({nombre});
      //const prods1= await notes.carro.findOne( { $text: { $search: "\"CINTA\"" } }).lean();
      var car_cont= Object.values(notes.carro);
      var cont=[];
    //  console.log(notes.carro.length)
      if(notes.carro){
        for(var i=0; i< notes.carro.length; i++){
         cont.push(notes.carro[i].nombreProd)
         }
       
       if(cont.includes(carro.nombreProd)){
        socket.emit("prodstatus","ya existe en carrito")
       
       }else{
       notes.carro.push(carro)
       notes.save();
       socket.emit("loadates",notes.carro)
       }
      }else{
      
        
      }
     
       
     
     /* if(notes.carro.indexOf(carro)){
        
      }else{
        notes.carro.push(carro)
     notes.save();
       socket.emit("getprod",carro)
      }*/
     // var car_cont= Object.values(notes.carro);
    //  car_cont.push(carro)
      //console.log(car_cont);
      
      

  
   
    
    }
   prods();
    
  });

});


app.get("/" ,async (req,res)=>{
  const nom_user= req.session.passport;
   
    
  })

//app.listen(process.env.PORT, () => { console.log(`Hello World Application is running on port ${process.env.PORT}`) })

server.listen(config.PORT, ()=>{

   console.log("server on port "+config.PORT);
})

