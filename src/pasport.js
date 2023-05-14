
var User=require("./models/users");
//const User= require("./models/USUARIOS");
//import User from "./models/USUARIOS";
const { Strategy }=require("passport-local");
//import { strategy } from "sharp";

const LocalStrategy= Strategy ;
module.exports= function(passport){

     passport.serializeUser(function(user, done){

        done(null, user.id)
     });

     passport.deserializeUser(function(id, done){

        User.findById(id, function(err, user){

            done(err, user)
        });
     });


     ///singup
     passport.use('local-signup',new LocalStrategy({

        usernameField:'nombre',
        userField:'user',
        useremailField:'email',
        passwordField:'password',

        passReqToCallback:true
        }, function(req, nombre,password, done){
           
             let user1=req.body.user;
            User.findOne({'user':user1 }, function(err, user){


                if(err){

                    return done(err)
                }
                if(user){
                  
                    return done(null, false, req.flash('singupMessage', 'is already take'))
                }else{

                    var newUser= new User();
                    newUser.nombre=nombre;
                    newUser.user=req.body.user;
                    newUser.email=req.body.email;
                    newUser.password= password;
              
                    newUser.save(function(err){

                        if(err){ throw err;}
                        return done(null, newUser)
                    });
                }
            })
        }
        ));

        passport.use('local-login',new LocalStrategy({

            usernameField:'nombre',
            passwordField:'password',
    
            passReqToCallback:true
            }, function(req, nombre, password, done){
    
                User.findOne({'user': nombre}, function(err, user){
    
    
                    if(err){
                        return done(err)
                    }
                    if(!user){
                       
                        return done(null, false, { message: 'Incorrect username' });
                    }
                    if(!user.validatePassword(password)){

                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                    
                });
            }
            ));
}
