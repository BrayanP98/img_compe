const express= require('express');
require('dotenv').config()
const config= require('./config')
const path= require('path');
const morgan= require('morgan');
const multer = require('multer')
const uuid1=require('uuid');
require('./database');





//////int express
const app= express();

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
    destination: path.join(__dirname, 'public/img/uploads'),
    
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

//app.listen(process.env.PORT, () => { console.log(`Hello World Application is running on port ${process.env.PORT}`) })
app.listen(config.PORT, ()=>{

   console.log("server on port "+config.PORT);
})

