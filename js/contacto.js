

//menu desplegable
let btnMenu = document.getElementById('btn-menu');
let mainNav = document.getElementById('main-nav');
btnMenu.addEventListener('click', function(){
  mainNav.classList.toggle('mostrar');
});





//validar y procesar el formulario
$(function() {
  //nos suscribimos al evento click del boton submit.
  //cuando dicho evento ocurra se ejecuta la lógica que escribimos
  $("#submit_btn").click(function(e) {
    e.preventDefault();
    //si los 3 campos del formulario estan completos, al apretar el boton submit, se envia el ///// formulario y nos da el mensaje de exito
    var name = $("input#name").val();
    var email = $("input#email").val();
    var textarea = $("input#textarea").val();

    if (name != "" && email != "" && textarea != "") {
      $("#envioExitoso").show();

    }
    });

    

    //borramos formulario
  $("#reset_btn").click(function(e){
    $("#name").val("");
    $("#email").val("");
    $("#textarea").val("");

    $("#envioExitoso").hide();

  });

 
    
});

//aparecer y desaparecer envio exitoso

$(function() {
  $('.error').hide();
  
  $(".button").click(function() {
      $('.error').hide();
      var name = $("input#name").val();
      if (name == "") {
      $("label#name_error").show();
      $("input#name").focus();
      return false;
      }
        var email = $("input#email").val();
        if (email == "") {
      $("label#email_error").show();
      $("input#email").focus();
      return false;
    }
   

  });
});



//campo suscribite
$('#btn-suscribe').on('click', () => {
  alert("Ya estas suscripto/a! Pronto recibiras novedades nuestras :)");
  });


  //dark mode
const darkMode = () => {
  $("body").css("background", "black")
  $("h1").css("color", "white")
  $("p").css("color", "white")
  $("label").css("color", "white")
  $("h2").css("color", "white")
  $(".main-header__txt").css("color", "white")
  $(".menu__item").css("color", "white")
   
  localStorage.setItem("dark", "dark")
}

const lightMode = () => {
  $("body").css("background", "white")
  $("h1").css("color", "black")
  $("p").css("color", "black")
  $("label").css("color", "black")
  $("h2").css("color", "black")
  $(".footer__txt").css("color", "white")
  $(".footer__title").css("color", "white")
  $(".main-header__txt").css("color", "black")
  $(".menu__item").css("color", "gray")
  
  
  localStorage.setItem("dark", "light")
}


$("#dark").on("click", () => {
  if (localStorage.getItem("dark") === "dark") {
      lightMode()
  } else {
      darkMode()
  }
})