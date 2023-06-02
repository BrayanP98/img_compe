const express= require('express');
require('dotenv').config()
const mongoose=require('mongoose');
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
const General=require('./src/models/generals')
const Pedido=require('./src/models/pedido')
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
  
  socket.on("getpedidos",async function(){

    var allPedidos= await Pedido.find()
    var general= await General.find()
    io.emit("pedido",allPedidos,general)
    
  })
  socket.on("saludo", function (data, data1) {
var pedidos=new Pedido();
    const pedid= async()=>{
   var onePedido= await Pedido.find().lean()
   var onePedido1=""
   for(let int=0; int< onePedido.length; int++){
   if( onePedido[int].dataUser.nombre==data1){
    onePedido1="existe"
   }else{
    onePedido1="no"
    
   }
   }
  //console.log(onePedido1)
   if(onePedido1=="existe"){
    socket.emit("prodstatus","ya tienes un pedido en proceso","error")
    
   }else{

    try {
      //var car_cont= Object.assign({}, da);
      const user= await Image.findOne({nombre:data1});
     // console.log(user.nombre)
     pedidos.dataUser.nombre=user.nombre;
     pedidos.dataUser.direccion=user.direccion;
     pedidos.dataUser.telefono=user.telefono;
     pedidos.dataUser.email=user.email
        for(var i=0; i<data.length; i++){
          pedidos.pedido.push(data[i])
        }
      await pedidos.save()
      var allPedidos= await Pedido.find()
      let carro=user.carro
      for(var i=0; i<carro.length; i++){
        user.pedidos.push(data[i])
      }
      //console.log(carro)
    //  user.pedidos.push(carro)
     user.carro=[];
      user.save()
      ///*---------emitir pedidos y info user
      io.emit("pedido",allPedidos)
      io.emit("notific","Hay un nuevo pedido")
      socket.emit("prodstatus","Tu pedido fue realizado con exito","success")
        }
        
      
     catch (error) {
      console.error(error)
    }
    
   }

  ///***----------vaciar carro */
 
 
    }
    pedid()

   
 
 
})
  socket.on("idUser", function (nombre, carro) {
    const img=new Image();
    const prods= async()=>{
      const notes1= await Image.findById({_id:nombre});
      
     // notes1.carro.product2=carro
    // notes1.save();
  //console.log(notes1.carro);

      socket.emit("loadates",notes1.carro, notes1)
    
    }
   prods();
    
  });
  socket.on("deleteprod", function (nombre, id) {
    const deleteprod= async()=>{
      
      const notes= await Image.findOne({user:nombre});
     
      let item_del= notes.carro.filter((item) =>item._id !=id)
      
     await notes.updateOne({carro:item_del})
    
     socket.emit("loadates",item_del)
    
    }
   deleteprod()
  
  })
  socket.on("sendprod", function (nombre, carro) {

    const img=new Image();
    const prods= async()=>{
      const notes= await Image.findOne({user:nombre});
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
       socket.emit("loadates",notes.carro,notes)
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

