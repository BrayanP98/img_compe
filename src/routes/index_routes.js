const {Router}= require('express');
const file = require('fs-extra/lib/ensure/file');
const { base } = require('../models/IMAGE');
const router=Router();
const Image=require('../models/IMAGE')
const Promo=require('../models/promos')
const General=require('../models/generals')
const fs = require('fs');
const IMAGE = require('../models/IMAGE');
const { MulterError } = require('multer');
const User=require('../models/users')
const multer = require('multer');
var passport = require('passport');

const pasport=require('../pasport')(passport);






function isLogedIn(req, res, next){

    if(req.isAuthenticated()){
      
  console.log()
      return next();
    }else{
        return next();
    }
    return res. redirect("/")
   }
 
router.get('/',isLogedIn, async(req,res)=>{
    const general= await General.find().lean();
    const promo= await Promo.find().lean();
    let numwh=general[0].numWhatsapp
    const nom_user= req.session.passport;
    
    var coche = JSON.stringify(nom_user);;
   var band;
    if(nom_user){
        band=true;
        const userlogin= await User.findById(nom_user.user).lean();
       
        res.render("catalogo.ejs", { promo, general,numwh,userlogin, band});
        
    }else{
        band=false
        const userlogin= "";
        console.log("no hay sesion")

        res.render("catalogo.ejs", {  promo, general,numwh,userlogin ,band});

    }
    
    
    
});

/*router.get('/:clave',async(req, res)=>{
    const promo= await Promo.find().lean();

    const  clave=req.params.clave.toUpperCase()
    console.log(clave)
   // const prods1= await Image.findOne( { $text: { $search: "\"CINTA\"" } }).lean();
   //const prods1= await Image.find({nombre:{$regex:/^/}},{nombre:1,_id:0})
   let prods1= await Image.find({ nombre : { $regex: clave} },{})
   res.redirect('/')
})
*/
router.get('/upload',async (req,res)=>{
    const prods= await Image.find().lean();

    
    

    
    res.render("uploads.ejs", { prods });
   //console.log(prods)

});
router.get('/adduser',async (req,res)=>{
    
    const nom_user= req.session.passport;
    
    console.log( req.session)
    
    

    
    res.render("adduser");
   //console.log(prods)

});
router.post("/task/addUser", passport.authenticate('local-signup',{
    successRedirect:'/',
    failureRedirect:('/'),
    failureMessage:true,
   failureFlash:true
   
    
 

}) );
router.post("/task/findUser", passport.authenticate('local-login',{
      
    successRedirect:'/',

    failureRedirect:('/'),
    failureMessage:true,
   failureFlash:true
   


}));

router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  });

router.get("/stock/:nombre/:stock", async (req,res)=>{
    let  nombre_clave=req.params.nombre;
    let  stock_clave=req.params.stock;
   // const prod= Image.find({"nombre":nombre})
   try{
    let prods1= await Image.find({ nombre : { $regex: nombre_clave} },{})
    let cantidad=stock_clave;
    let id2=prods1[0].id;
    
    const updateProdimg=await Image.findByIdAndUpdate(id2,{cantidad:cantidad}).lean();
  
   res.redirect("/")
   } catch{
    console.log("no se puedo")
   }
   
}) ;

router.get('/catalogo',async (req,res)=>{
    var cats=["ferreteria","hogar","papeleria","varios", "aseo personal","salud","alimentos"]
    const prods= await Image.find().lean();
    const promo= await Promo.find().lean();
    
    res.render("catalogo.ejs", { prods, promo });
   //console.log(prods)

});

 router.get('/promo',async(req, res,)=>{

    const proms= await Promo.find().lean();
    res.render('promos',{proms});
    
   

 });

 router.get('/deleteprom/:id',async(req, res,)=>{
    let  id=req.params.id;
    try{
     await Promo.findByIdAndDelete(id).lean();
      res.redirect('/promos');
    }catch{
     res.send('<script>window.history.go(-1)</script>');
    }
     

 })
 router.post('/promo',async(req, res,)=>{
    const filein=(req.file.path);
    


try{
    const img= new Image();
    const promo= new Promo();
    promo.cantidad=req.body.cantidad;
    promo.codigo=req.body.codigo;
    promo.nombre=req.body.nombre;
    promo.valor=req.body.valor;
    promo.descripcion=req.body.descripcion;
    promo.promo=req.body.valorPromo;
    promo.mensaje=req.body.mensajeProm;
    promo.imagen='data:image/jpeg;base64,'+fs.readFileSync(filein, 'base64');

    await promo.save    ();
  
    res.redirect('/promo')
}catch{
    res.send('<script>window.history.go(-1)</script>');
}
 
//onsole.log('data:image/jpeg;base64,/'+base64);

});
 router.get('/generalfirstcommit',async(req, res,)=>{
    var general1= new General();
    general1.numWhatsapp="3026055289";
    general1.color="#16a07b81 ";
    general1.favicon=""
     await general1.save();
     res.redirect('/general')
 })
 router.get('/general',async(req, res,)=>{
   
        
        const general= await General.find().lean();
        res.render('general',{ general})

 })

 router.post('/general/:id',async(req, res,)=>{
    var  id3=req.params.id;
    const filein=(req.file.path);
    try{
     const general1= new General();
       general1.numWhatsapp=req.body.numWhatsapp
       general1.color=req.body.color;
       general1.tocken=req.body.tocken;
       let favicon='data:image/jpeg;base64,'+fs.readFileSync(filein, 'base64');
       
      
       const updategen=await General.findByIdAndUpdate(id3,req.body).lean();
       const updateProdimg=await General.findByIdAndUpdate(id3,{favicon}).lean();
        res.redirect('/general')
    }catch{

    res.send("no se pudo")
    }
 })
router.post('/upload',async(req, res,)=>{
    const filein=(req.file.path);
    const cat="pollos";


try{
    const img= new Image();
 img.cantidad=req.body.cantidad;
 img.categoria=req.body.categoria;
 img.codigo=req.body.codigo;
 img.nombre=req.body.nombre;
 img.valor=req.body.valor;
 img.promo=req.body.promo;
 img.descripcion=req.body.descripcion;
 img.medida=req.body.medida;
 img.imagen='data:image/jpeg;base64,'+fs.readFileSync(filein, 'base64');

 
    await img.save();


   
    res.redirect('/upload')
}catch{
    res.send('<script>window.history.go(-1)</script>');
}
 
//onsole.log('data:image/jpeg;base64,/'+base64);

});

router.get('/delete/:id',async(req, res)=>{
    const  id=req.params.id;
   try{
    await Image.findByIdAndDelete(id).lean();
     res.redirect('/upload');
   }catch{
    res.send('<script>window.history.go(-1)</script>');
   }
    
});

router.get('/find/:id',async(req, res)=>{

    const {id}= req.params;
const producto= await Image.findById(id).lean();
res.render("update", { producto });


});
router.get('/pedidos',async(req, res)=>{

    const {id}= req.params;
const producto= await Image.findById(id).lean();
res.render("image");


});
router.post('/updateUser/:id',async(req, res)=>{
    const id2=req.params.id;
  // console.log(req.body)
var user= new User();
 try{

    var data= await User.findByIdAndUpdate(id2,req.body)
   
    
     
     
        res.redirect('/')
    }catch(err){
     //   res.send('<script>window.history.go(-1)</script>');
        console.log(err)
    }
 
 });
router.post('/update/:id',async(req, res)=>{
    const id2=req.params.id;
   
    //const id1="63487cf80007932e1ce928a8";
   const filein=(req
    .file.path);
 try{
        const img= new Image();
     img.codigo=req.body.codigo;
     img.nombre=req.body.nombre;
     img.valor=req.body.valor;
     img.promo=req.body.promo;
     img.descripcion=req.body.descripcion;
    let imagen='data:image/jpeg;base64,'+fs.readFileSync(filein, 'base64');
 const updateProd=await Image.findByIdAndUpdate(id2,req.body).lean();
 const updateProdimg=await Image.findByIdAndUpdate(id2,{imagen}).lean();
 //   const updateProd=await Image.findOneAndReplace(id2,req.body)
   //const updateProdimg=await Image.findOneAndReplace(id2,{imagen})
    // console.log(req.body.image)
    
     
     
        res.redirect('/upload')
    }catch(err){
     //   res.send('<script>window.history.go(-1)</script>');
        console.log(err)
    }
 
 });

router.get('/img/:id', (req, res)=>{

    res.send('hola',)
})

router.get('/img/:id/delete', (req, res)=>{

    res.send('eliminada con exito')
})





module.exports=router;