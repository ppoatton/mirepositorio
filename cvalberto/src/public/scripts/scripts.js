const axios = require("axios");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.getElementById("idBtnEnviar").addEventListener("click",function(){
  let strCorreo = document.getElementById("idInCE").value;
  let strMensaje = document.getElementById("idInMen").value;

  if(strCorreo != "" &&  strMensaje != ""){
      let datos ={
          c: strCorreo,
          
          m:strMensaje
      };
      axios.post('/src/views/contacto',datos)
      .then(function(response){
          document.getElementById("idInCE").value="";
         
          document.getElementById("idInMen").value="";
          alert("Gracias por escribir, en breve me pondre en contacto");
      }).catch(function(error){
          console.log(error);
      });
  }else{
      alert("Por fovor rellenar todos los campos");
  }

});