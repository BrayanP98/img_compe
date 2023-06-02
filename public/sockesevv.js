
var socket = io.connect("wss://competidor.store", { forceNew: true });


socket.on("pedido", function(data, data1){
   
    var car_cont= Object.values(data);
    //console.log(data1)
    const bartocken=data1[0].tocken
  const cant_pedidos= data.length
var notificacion=document.querySelector("#cont_notifc");
notificacion.innerHTML="    "
for(let i=0; i< data.length; i++){
    
    var pop_notif=document.createElement("div");
    pop_notif.id="pop_notific"
    var title_not=document.createElement("h2");
    title_not.id="title_not"
    
    title_not.innerHTML="Nuevo pedido de:"+" "+data[i].dataUser.nombre
    pop_notif.appendChild(title_not);
    
    notificacion.appendChild(pop_notif);
    pop_notif.addEventListener("click", function(){
        var car_cont= Object.values(data);
     //   var length=car_cont.length
      //  data1.carro.length
        var body_prods=document.querySelector("#body_prods");
        var name_user=document.querySelector("#name_user")
        var email_user=document.querySelector("#email_user")
        var addres_user=document.querySelector("#addres_user")
        var phone_user=document.querySelector("#phone_user")
        var total_table=document.querySelector("#total_table")
        body_prods.innerHTML=""
        var total=0;
  
      name_user.value=data[i].dataUser.nombre;
      phone_user.value=data[i].dataUser.telefono;
      addres_user.value=data[i].dataUser.direccion;
     email_user.value=data[i].dataUser.email;
    //--------------------------LLENAR TABLA------------
    let length1=data[i].pedido.length
        for(let int=0; int< length1; int++){
           
            var tr= document.createElement("tr");
            var td_prod=document.createElement("td");
            var td_cant=document.createElement("td");
            var td_valor=document.createElement("td");
            td_prod.innerHTML=data[i].pedido[int].nombreProd
            td_cant.innerHTML=data[i].pedido[int].cantidad
            td_valor.innerHTML=data[i].pedido[int].valor
            tr.appendChild(td_prod)
            tr.appendChild(td_cant)
            tr.appendChild(td_valor)
            body_prods.appendChild(tr)
    
           total=total+parseFloat(data[i].pedido[int].valor)
        }
    
     total_table.innerHTML="$"+total
    })
   
}
var cant_pedid=document.querySelector("#cant_pedid")
cant_pedid.innerHTML=cant_pedidos

/*var pop_notif=document.createElement("div");
pop_notif.id="pop_notific"
var title_not=document.createElement("h2");
title_not.id="title_not"

title_not.innerHTML="nuevo pedido de"+data1.nombre
pop_notif.appendChild(title_not);

notificacion.appendChild(pop_notif);*/

var conf_ped=document.querySelector("#conf_ped");
var phone_user=document.querySelector("#phone_user");
conf_ped.onclick=function(){
   event.preventDefault();
let phone=phone_user.value;

   send_whatsapp("57"+phone, bartocken)
}

   
    
         })
         socket.on("notific", function(data){

            new_pedido(data)
         })
function new_pedido(alert){
    var pop_notfc=document.querySelector("#pop_notfc");
    var text_alert=document.querySelector("#text_alert");
    text_alert.innerHTML=alert
    pop_notfc.classList.toggle("active")

  /* swal({
        title: "Inicie secion por favor!!",
        text: "para poder agregar al carrito",
        timer: 3000,
        showConfirmButton: false
});*/
}
       

         window.addEventListener("load",function(){

            socket.emit("getpedidos")
         })

         function send_whatsapp(phoneNbr, bearerToken){
            var botId = '104139039369000';
           // var phoneNbr = '573026055289';
            //var bearerToken = 'EAAH55QLPNwcBAE05SQrtLZAgDLvyELqd2XsHmSzTQiOaXfZCpZBV8CiCZBd1MFsjFO61me6jbsiQzynXprNh0iCDAPbwy2gbTvZA2tBpFgHGU1GjXuvo67L7RmSHEBRQOoQPkTZAlCwjlUCYEHK34uUaa2ONAWhiaUDNkQB05vpmrqpCYFAmR0';
            
            var url = 'https://graph.facebook.com/v16.0/' + botId + '/messages';
            var data = {
              messaging_product: 'whatsapp',
              to: phoneNbr,
              type: 'template',
              template: {
                name:'hello_world',
                language:{ code: 'en_US' }
              }
            };
            
            var postReq = {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + bearerToken,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
              json: true
            };
            
            fetch(url, postReq)
              .then(data => {
                return data.json()
              })
              .then(res => {
                if(res.error){
                  console.log(res.error.message)
                }else{
                  console.log(res)
                }
                
              })
              .catch(error => console.log(error));
            }