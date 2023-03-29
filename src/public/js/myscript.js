  $(document).ready(function(){
    $("#updateBtn").click(function() {
        event.preventDefault();     
           $("#pop-up").addClass('show')
           $("#pop-wrap").addClass('show')
           });
     
           
       });



 $(document).click(function() {
 var obj = $("#container");
  if (!obj.is(event.target) && !obj.has(event.target).length) {
          
    }
  else {
    $("#navbarNavAltMarkup").collapse('hide');
     }
    });
       
btn_registrar = $('#registrar');
btn_registrar.on('clicl',mostrarMensaje1);
function mostrarMensaje1(){
    alert('Bienvenido al curso JavaScript de aprenderaprogramar.com');
    }
    
    function mostrarMensaje2( ){
    alert('Ha hecho click sobre el párrafo inferior');
    }
    
    function mostrarMensaje3(nombre){
        
        let num1=9;
        let num2=5;
        let suma=num1+num2
    alert('Estamos cargando los contenidos de la web...'+nombre);}
    
   
        
    function mostrarNombre(){
    event.preventDefault();
        var name = document.getElementById("name").value;
        if(parseInt(name)==3){
            alert("es el numero correcto")
        }else{
            
      document.getElementById("load").style.visibility = "visible";
      
            var suma=parseInt(name)+3;
           //alert("hola"+suma)
           document.getElementById('resultado').innerHTML = suma;
            var salida = document.getElementById("resultado").innerHTML.preventDefault=suma;
            
        }

    }
    function mostrarPopUp(){

        document.getElementById("pop-up").style.visibility = "visible";
      

    }
    function saveContact(){

        var name = document.getElementById("name_con").value;
        var telefono = document.getElementById("cel_con").value;
            alert("BIENVENIDO"+telefono+"   "+name);
            
           // var salida = document.getElementById("resultado").innerHTML=suma;
            
        }
window.addEventListener("load",function(){

    this.alert("hola")
  
    
   
        });


        //how connect to sqmyl?



        
        
     
          