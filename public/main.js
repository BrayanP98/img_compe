
var socket = io.connect("ws://192.168.1.3:4000", { forceNew: true });

const nombreuser= document.querySelector("#nombre_user") 

socket.on("messages", function (data) {
  
});
socket.on("prodstatus", function(status) {
  swal("Oops!", "El producto ya se encuentra en el carrito", "error");
 
})
/*socket.on("getprod", function(notes1) {
console.log()
  /////creando div item carro
  var  item_car= document.querySelector("#item_car") 
  item_car.style="visibility:visible"
  var product_car=document.querySelector("#product_car");
  var carItem= document.createElement("div")
  carItem.id="carItem"
    var car_prodName=document.createElement("h3");
    car_prodName.id="car_prodName";
    var car_prodvalue=document.createElement("a");
    var div_cant_prod=document.createElement("div")
    div_cant_prod.id="div_cant_prodCar";
    var button_menos=document.createElement("a")
    button_menos.id="button_menos"
    var input=document.createElement("input")
    input.id="cant_prod"
    var button_mas=document.createElement("a")
    button_mas.id="button_mas"
        input.value=notes1.cantidad
        button_mas.innerHTML="+"
        button_menos.innerHTML="-"
    car_prodvalue.id="car_prodvalue";
    car_prodvalue.innerHTML=notes1.valor;
    car_prodName.innerHTML=notes1.nombreProd;
    div_cant_prod.appendChild(button_menos)
    div_cant_prod.appendChild(input)
    div_cant_prod.appendChild(button_mas)
   
    carItem.appendChild(car_prodName)
    carItem.appendChild(car_prodvalue)
    carItem.appendChild(div_cant_prod)
    product_car.appendChild(carItem)

    ///////numero items carro
    

    if(num_itmes==""){
      var card_none=document.querySelector("#carItemnone");
      card_none.style="display:none;"
      num_itmes=0
      item_car.innerHTML= parseInt(num_itmes)+1
    }else{
      item_car.innerHTML= parseInt(num_itmes)+1
    }
   
    
  
    })*/
var item_car= document.querySelector("#item_car") 

socket.on("loadates", function(notes)   {
  var cart=notes;
  console.log(cart.length)
  if(cart){
   

  var length = cart.length
  //console.log(length);
  
  var cont=1;
  var total_car=0;
  if(length >0 ){
   var car_cont= Object.values(cart);
   var product_car=document.querySelector("#product_car");
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
      car_prodvalue.innerHTML=car_cont[i].valor;     
      div_cant_prod.appendChild(button_menos)
      div_cant_prod.appendChild(input)
      div_cant_prod.appendChild(button_mas)
      delete_item.appendChild(img_delete_item)
      div_cant_prod.appendChild(delete_item)
     
      carItem.appendChild(car_prodName)
      carItem.appendChild(car_prodvalue)
      carItem.appendChild(div_cant_prod)

      product_car.appendChild(carItem)
      button_mas.onclick=function(){
        let cant_prod=document.getElementById("cant_prod"+"_"+i)
       let label_total=document.querySelector("#label_total");
       cant_prod.style.background="white"
       let total_car=label_total.innerHTML
        let cant= cant_prod.value
        let new_cant =parseInt(cant)+1;
        let new_valor=new_cant
        cant_prod.value=new_cant
        let new_total=parseFloat(total_car)+parseFloat(car_cont[i].valor)
        cant_prod.value=new_cant
        label_total.innerHTML=Math.round(new_total).toFixed(3)
        console.log(new_valor)
      }
      button_menos.onclick=function(){
       
        let cant_prod=document.getElementById("cant_prod"+"_"+i)
       let label_total=document.querySelector("#label_total");
        
       let total_car=label_total.innerHTML
        let cant= cant_prod.value
        if(parseInt(cant)>0){
         
          let new_cant =parseInt(cant)-1;
          let new_valor=new_cant
          cant_prod.value=new_cant
          let new_total=parseFloat(total_car)-parseFloat(car_cont[i].valor)
          cant_prod.value=new_cant
          label_total.innerHTML=Math.round(new_total)
          console.log(new_valor)
        }else{
          cant_prod.style.background="red"
        }
        
      }



      //////borrar producto---------------------------------------------
      delete_item.onclick=function(){
      var nombre =nombreuser.innerHTML
      
       let id=car_cont[i]._id;
       socket.emit("deleteprod", nombre, id)
       product_car.innerHTML=""
      
       
      }
      total_car=total_car+parseFloat(car_cont[i].valor)
     var iter="1";
     var total= cont++;
     //console.log(car_cont[i])
    // document.querySelector("#car_prodName").innerHTML=
    }
    console.log( )
    
    var label_total=document.querySelector("#label_total");
    label_total.innerHTML=total_car.toFixed(3)

   
    var  item_car= document.querySelector("#item_car") 
    item_car.innerHTML=length
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
    car_prodName.innerHTML="Tu carrito esta vacio...."
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
//  var obj = document.getElementById("container");
if (!cont_buy.contains(event.target)) {
    if(cont_buy.classList=="active"){
      cont_buy.classList.remove("active")
    }


 
}
else {
  alert("Inside click detected!");
}
});
