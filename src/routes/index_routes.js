const {Router}= require('express');
const file = require('fs-extra/lib/ensure/file');
const { base } = require('../models/IMAGE');
const router=Router();
const Image=require('../models/IMAGE')
const Promo=require('../models/promos')
const fs = require('fs');
const IMAGE = require('../models/IMAGE');
const { MulterError } = require('multer');
const multer = require('multer');


router.get('/', async (req,res)=>{
    const prods= await Image.find().lean();
    
    const promo= await Promo.find().lean();
    
    res.render("catalogo.ejs", { prods, promo });
});


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
    try{
        const promo= new Promo();
        promo.cantidad="122";
        promo.categoria="bellezab";
        promo.codigo="256b";
        promo.nombre="aceite bebe";
         promo.valor="12c000";
         promo.descripcion="estab";
         promo.promo="2222"
     
         promo.imagen='/img/logo.png';
    
     
        await promo.save();
    
    
       
        res.redirect('/upload')
    }catch{
        res.send('<script>window.history.go(-1)</script>');
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
    const filein=(req.file.path);
    try{
        const img= new Image();
     img.codigo=req.body.codigo;
     img.nombre=req.body.nombre;
     img.valor=req.body.valor;
     img.descripcion=req.body.descripcion;
     img.imagen='data:image/jpeg;base64,'+fs.readFileSync(filein, 'base64');
     const updateProd=await Image.findByIdAndUpdate(id2,req.body).lean();

     
    
     
     
        res.redirect('/upload.ejs')
    }catch{
        res.send('<script>window.history.go(-1)</script>');
    }
 
 });

router.get('/img/:id', (req, res)=>{

    res.send('hola',)
})

router.get('/img/:id/delete', (req, res)=>{

    res.send('eliminada con exito')
})
module.exports=router;