var socket = io.connect("wss://competidor.store", { forceNew: true });


socket.on("pedido", function(data, data1){
    var car_cont= Object.values(data);
 // console.log(car_cont)
  
var notificacion=document.querySelector("#notificacion");
notificacion.innerHTML="    "
for(let i=0; i< data.length; i++){

    var pop_notif=document.createElement("div");
    pop_notif.id="pop_notific"
    var title_not=document.createElement("h2");
    title_not.id="title_not"
    
    title_not.innerHTML="nuevo pedido de"+data[i].dataUser.nombre
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


/*var pop_notif=document.createElement("div");
pop_notif.id="pop_notific"
var title_not=document.createElement("h2");
title_not.id="title_not"

title_not.innerHTML="nuevo pedido de"+data1.nombre
pop_notif.appendChild(title_not);

notificacion.appendChild(pop_notif);*/


   
    
         })

         window.addEventListener("load",function(){

            socket.emit("getpedidos")
         })