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
const multer = require('multer');


router.get('/', async (req,res)=>{
    const prods= await Image.find().lean();
    const general= await General.find().lean();
    const promo= await Promo.find().lean();
    let numwh=general[0].numWhatsapp
    
    res.render("catalogo.ejs", { prods, promo, general,numwh });
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
router.get('/catalogo',async (req,res)=>{
    var cats=["ferreteria","hogar","papeleria","varios", "aseo personal","salud","alimentos"]
    const prods= await Image.find().lean();
    const promo= await Promo.find().lean();
    
    res.render("catalogo.ejs", { prods, promo });
   //console.log(prods)

});
router.get('/update', (req,res)=>{ 
   
    
    res.render('update.ejs');
 
 });
 router.get('/promo',async(req, res,)=>{

    res.render('promos');
    /*try{
        const promo= new Promo();
         promo.cantidad="122";
         promo.codigo="566";
         promo.nombre="aceite maquina";
         promo.valor="12000";
         promo.descripcion="estab";
         promo.promo="11500"
         promo.mensaje="pague 12 lleve 13!";
         promo.imagen='/img/logo.png';

    
     
        await promo.save();
    
    
       
        res.redirect('/upload')
    }catch{
        res.send('<script>window.history.go(-1)</script>');
    }*/

 });
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


  

 
    await promo.save();


   
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

     await general1.save();
     res.redirect('/general')
 })
 router.get('/general',async(req, res,)=>{
   
        
        const general= await General.find().lean();
        res.render('general',{ general})

 })

 router.post('/general/:id',async(req, res,)=>{
    var  id3=req.params.id;
    try{
     const general1= new General();
       general1.numWhatsapp=req.body.numWhatsapp
       general1.color=req.body.color;
      
       const updategen=await General.findByIdAndUpdate(id3,req.body).lean();
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
     res.redirect('/upload.ejs');
   }catch{
    res.send('<script>window.history.go(-1)</script>');
   }
    
});

router.get('/find/:id',async(req, res)=>{

    const {id}= req.params;
const producto= await Image.findById(id).lean();
res.render("update.ejs", { producto });


});
router.get('/image/:id',async(req, res)=>{

    const {id}= req.params;
const producto= await Image.findById(id).lean();
res.render("image.ejs", { producto });


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