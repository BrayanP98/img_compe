
var socket = io.connect("wss://competidor.store", { forceNew: true });

const nombreuser= document.querySelector("#nombre_user") 

socket.on("getprods", function (prods) {

  pintarProd(prods)
  
});
function pintarProd(prods){
  var length= prods.length;
 
  for(let i=0; i< length; i++){
    var listop=document.getElementById("box-search")
    var buscar_btn=document.getElementById("input_buscar")
  var li_options1= document.createElement("li");
  var a_options1= document.createElement("a");
////llenando li de busqueda
  a_options1.innerHTML=prods[i].nombre;
  li_options1.appendChild(a_options1)
  listop.appendChild(li_options1)

  ////creando card-------
    var secc_prod=document.getElementById("seccion_"+prods[i].categoria)
    var card=document.createElement("div");
    card.id="catalogo"
   
    var img_prod=document.createElement("img")
    img_prod.id=prods[i].nombre
    img_prod.setAttribute("loading", "lazy")
    img_prod.setAttribute("src", prods[i].imagen)
    var revisar=document.createElement("button");
  revisar.id="revisar"
  var descipcion=document.createElement("div");
  descipcion.id="descript"
  var nombre_prod=document.createElement("h3");
  
   nombre_prod.className="nombre-prod";
   var codigo=document.createElement("p");
   var prod_valor=document.createElement("h4");
   codigo.innerHTML=prods[i].codigo
   prod_valor.innerHTML=prods[i].valor
  


   revisar.setAttribute("onclick","mostrar('"+prods[i].nombre+"','"+prods[i].valor+"','"+prods[i].promo+"','"+prods[i].imagen+"','"+prods[i].descripcion+"','"+prods[i].medida+"','"+prods[i].cantidad+"')");
  if(prods[i].promo){
    if(prods[i].promo=="0"){

    }else{
     
      var label_prom=document.createElement("a");
      label_prom.id="etiq_descuento";
      label_prom.innerHTML=prods[i].promo+"%OFF"
      revisar.appendChild(label_prom)   
    }
  }
   
 nombre_prod.innerHTML=prods[i].nombre
  descipcion.appendChild(nombre_prod)
  descipcion.appendChild(codigo)
  descipcion.appendChild(prod_valor)
  card.appendChild(revisar)
  card.appendChild(img_prod)
  card.appendChild(descipcion) 
  secc_prod.appendChild(card)
   // console.log(prods[i])
  }
}
socket.on("prodstatus", function(message,status,) {
  swal("eyy!", message, status);
 
})

var item_car= document.querySelector("#item_car") 

socket.on("loadates", function(notes, data)   {
  var notif_data_bar=document.querySelector("#notif_data-bar")
  var notif_data=document.querySelector("#notif_data")
  if(data.direccion){
    if(data.direccion==""){
      notif_data_bar.style="visibility:visible;"
    notif_data.style="visibility:visible;"
    }
    
  }else{
    notif_data_bar.style="visibility:visible;"
    notif_data.style="visibility:visible;"
  }
  //console.log(data.nombre)

    pintarData(data)
  
  var cart=notes;

   if(cart){
    
  const length = cart.length
  var  item_car= document.querySelector("#item_car") 
    item_car.innerHTML=length
;
  
  var cont=1;
  var total_car=0;
  if(length >0 ){
    var  buy_car=document.querySelector("#buy_car");
  buy_car.style="display:flex;"

    var  item_car= document.querySelector("#item_car") 
  item_car.style="visibility:visible"
   var car_cont= Object.values(cart);
   var product_car=document.querySelector("#product_car");
     product_car.style="height: 340px;"
   product_car.innerHTML=""
    for(let i=0; i< length; i++){
    var carItem= document.createElement("div")
    carItem.id="carItem"
      var car_prodName=document.createElement("h3");
      car_prodName.id="car_prodName";
      var car_prodvalue=document.createElement("a");
      car_prodvalue.id="car_prodvalue";
      var div_cant_prod=document.createElement("div")
      div_cant_prod.id="div_cant_prodCar";
      var button_menos=document.createElement("a")
      button_menos.id="button_menos"
      var input=document.createElement("input")
      input.id="cant_prod"+"_"+i
      input.className="cant_prod"
      var button_mas=document.createElement("a")
      button_mas.id="button_mas"
      var delete_item=document.createElement("button")
      delete_item.id="delete_item"
      var img_delete_item=document.createElement("img")
      img_delete_item.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAPJJREFUSEvtltERwiAQRDeVmFK0E+3MTrQTtRNnHZMhCOxiMuIHfJK7e9xyXG5AozU04qIGfAQwioPeAZydZFzwBcDeCQjgCuCgbB0ws7ypQNF3gnmA7HLAzJQZc5UCunavQH8DpqwsonDtgj0WziOjn7KjL4svmXEoV+W1SvPFNcVSNwOHx56ekPU8onylb6m4pHNBXOlbC566V9ihUnubg1MB3b2FQLUZu5Ce8UcddqlVA+nFRYVcFVa942adS/773gabN5Cfgl1Yyo5Txyn1odRAvpkuY0Z2OFTDHuGcStQgn8t2nrFiAwVeI3PRtxn4Cekjhh+wS/IAAAAAAElFTkSuQmCC")
     // delete_item.id="delete_item"
      input.value=car_cont[i].cantidad
          button_mas.innerHTML="+"
          button_menos.innerHTML="-"
      car_prodName.innerHTML=car_cont[i].nombreProd
      car_prodvalue.innerHTML=(parseFloat(car_cont[i].valor)/1000).toFixed(3) ;     
      div_cant_prod.appendChild(button_menos)
      div_cant_prod.appendChild(input)
      div_cant_prod.appendChild(button_mas)
      delete_item.appendChild(img_delete_item)
      div_cant_prod.appendChild(delete_item)
     
      carItem.appendChild(car_prodName)
      carItem.appendChild(car_prodvalue)
      carItem.appendChild(div_cant_prod)

      product_car.appendChild(carItem)
    ///total carro------------------------------------------------------------

      total_car=total_car+parseFloat(car_cont[i].valor)
      
      button_mas.onclick=function(){

       
    
       let cant_prod=document.getElementById("cant_prod"+"_"+i)
       let label_total=document.querySelector("#label_total");
       cant_prod.style.background="white"
       var tot_car=parseFloat(label_total.innerHTML);
        let cant= cant_prod.value
        let new_cant =parseInt(cant)+1;
        let new_valor=tot_car*1000 
        cant_prod.value=new_cant
        car_cont[i].cantidad= new_cant.toString()
      
        var new_total=new_valor+parseFloat(car_cont[i].valor)
       // console.log(new_total)
        cant_prod.value=new_cant
        label_total.innerHTML=parseFloat(new_total/1000).toFixed(3)
       // console.log(new_valor)*/
      }
      button_menos.onclick=function(){
        let cant_prod=document.getElementById("cant_prod"+"_"+i)


       let label_total=document.querySelector("#label_total");
       cant_prod.style.background="white"
       var tot_car=parseFloat(label_total.innerHTML);
        let cant= cant_prod.value
        if(cant>0){
          let new_cant =parseInt(cant)-1;
          let new_valor=tot_car*1000 
          cant_prod.value=new_cant
          var new_total=new_valor-parseInt(car_cont[i].valor)
          console.log(new_total)
          cant_prod.value=new_cant
          car_cont[i].cantidad= new_cant.toString()
          label_total.innerHTML=parseFloat(new_total/1000).toFixed(3)
         // console.log(new_valor)
        }else{
          cant_prod.style="background:red;"
        }
        }
       //-----------------------------------------------------------comprar------------------------------------------------
      
        var buy=document.querySelector("#buy")

        buy.onclick=function(){
         let nombre=data.nombre
        
        if(data.direccion){
          sendwhatsapp(car_cont,nombre)
        }else{
          swal("Oops!", "Debes llenar tus datos de contacto primero", "error");
        // 
        }
      
         // sendwhatsapp(notes, data)
        }


      //////borrar producto---------------------------------------------
      delete_item.onclick=function(){
      var nombre =nombreuser.innerHTML
      
       let id=car_cont[i]._id;
       socket.emit("deleteprod", nombre, id)
       product_car.innerHTML=""
      
       
      }
    
     var iter="1";
     var total= cont++;
     //console.log(car_cont[i])
    // document.querySelector("#car_prodName").innerHTML=
    }
    console.log( )
    
    var label_total=document.querySelector("#label_total");
    label_total.innerHTML=(total_car/1000).toFixed(3)

   
    
  }else{
    var  item_car= document.querySelector("#item_car") 
  item_car.style="visibility:hidden"
  prod_clean()
  }
  
}else{
  var  item_car= document.querySelector("#item_car") 
  item_car.style="visibility:hidden"
  prod_clean()
}
})

function prod_clean(){
  var product_car=document.querySelector("#product_car");
  var  buy_car=document.querySelector("#buy_car");
  buy_car.style="display:none;"
  var carItem= document.createElement("div")
  carItem.id="carItemnone"
    var car_prodName=document.createElement("h2");

    car_prodName.id="car_prodName";
    car_prodName.innerHTML="Upss!..  Tu carrito esta vacio...."
    var imgoff=document.createElement("img")
    imgoff.id="imgOff"
    imgoff.setAttribute("src","https://www.start.com.ar/Content/img/empty-cart.svg")
    var parrafo=document.createElement("p")
    parrafo.id="parrafo"
    parrafo.innerHTML="Para agregar productos al carrito debes iniciar secion. <br> Hazlo pronto y no te pierdas nuestras promociones."
    carItem.appendChild(car_prodName)
    carItem.appendChild(imgoff)
    carItem.appendChild(parrafo)
    product_car.appendChild(carItem)
    product_car.style="height:400PX"
}

//-----------*********------------------*******----------

function sendwhatsapp(valor, nombre){
//console.log(" mi pedido tiene un valor de"+nombre)


  socket.emit("saludo", valor, nombre)
}





var icon_car=document.querySelector("#icon_car")
icon_car.onclick= function(){
  var product_car=document.querySelector("#cont_buy");
  
  if(product_car.classList=="active"){
    cont_buy.classList.remove("active")
  
  }else{
    product_car.classList.add("active")
  }
  
}

var create_user=document.querySelector("#crear_cuenta");  
create_user.onclick=function(){
  var pop_reg_user=document.querySelector("#pop-up-reg");
if(cont_buy.classList=="active"){
      cont_buy.classList.remove("active")
    }
    pop_reg_user.classList.toggle("active")
}

var close_view_sigin=document.querySelector("#close_view_reg"); 
close_view_sigin.onclick=function(){

  var pop_reg_user=document.querySelector("#pop-up-reg");

  pop_reg_user.classList.remove("active")

}
var close_view_log=document.querySelector("#close_view_log"); 
close_view_log.onclick=function(){

  var pop_user_log=document.querySelector("#pop-up-sigin");

        pop_user_log.classList.remove("active")

}

  
//////inicio de secion 
var user_sigin=document.querySelector("#user_sigin")
var  opciones_user=document.querySelector("#opciones_user")
user_sigin.onclick=function(){
  var pop_user=document.querySelector("#pop-up-sigin");
  if(nombreuser.innerHTML){
    opciones_user.classList.toggle("active")
  }else{
   
    pop_user.classList.toggle("active")
  }
  

  
 

}
 
document.getElementById("container-fluid").addEventListener("mouseup", function(event) {
  var cont_buy=document.getElementById("cont_buy");
  var lateral_data=document.getElementById("lateral_data");
  var opciones_user=document.getElementById("opciones_user");
//  var obj = document.getElementById("container");
if (!cont_buy.contains(event.target)) {
    if(cont_buy.classList=="active" ||lateral_data.classList=="active" || opciones_user.classList=="active"){
      cont_buy.classList.remove("active")
      lateral_data.classList.remove("active")
      opciones_user.classList.remove("active")
    }

}
else {
  alert("Inside click detected!");
}
});


//-----------------DATOS USUARIO-VISTA LATERAL------------------------------
function pintarData(data){
  var btn_dataUser=document.querySelector("#btn_dataUser")
var  opciones_user=document.querySelector("#opciones_user")
var lateral_data=document.querySelector("#lateral_data");
btn_dataUser.onclick=function(){
  opciones_user.classList.remove("active")
  if(data){
    var nameDataUser=document.querySelector("#nameDataUser")
  var celDataUser=document.querySelector("#celDataUser")
  var addresDataUser=document.querySelector("#addresDataUser")
  var emailDataUser=document.querySelector("#emailDataUser")
  var update_dataUser=document.querySelector("#update_dataUser")
  lateral_data.classList.toggle('active')
  nameDataUser.value=data.nombre
  celDataUser.value=data.telefono;
  addresDataUser.value=data.direccion
  emailDataUser.value=data.email;
  if(addresDataUser.value=="undefined" || celDataUser.value=="undefined"){
    addresDataUser.style="border:1px solid red;"
    celDataUser.style="border:1px solid red;"
   addresDataUser.value=""
   
   celDataUser.value=""
   addresDataUser.setAttribute("placeholder","por llenar")
   celDataUser.setAttribute("placeholder","por llenar")
  }
 
  update_dataUser.onclick=function(){
    var form_dataUser=document.querySelector("#form_dataUser")
    
    form_dataUser.setAttribute("action","/updateUser/"+data._id)

  }

  }else{
    
   


  }
 
}
}