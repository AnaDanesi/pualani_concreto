

//menu desplegable
let btnMenu = document.getElementById('btn-menu');
let mainNav = document.getElementById('main-nav');
btnMenu.addEventListener('click', function(){
  mainNav.classList.toggle('mostrar');
});


//slider
const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length -1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next() {
  let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
  slider.style.marginLeft = "-200%";
  slider.style.transition = "all 0.5s";
  setTimeout(function(){
    slider.style.transition = "none";
    slider.insertAdjacentElement('beforeend', sliderSectionFirst);
    slider.style.marginLeft = "-100%";
  }, 500);
}

function Prev() {
  let sliderSection = document.querySelectorAll(".slider__section");
  let sliderSectionLast = sliderSection[sliderSection.length -1];
  slider.style.marginLeft = "0";
  slider.style.transition = "all 0.5s";
  setTimeout(function(){
    slider.style.transition = "none";
    slider.insertAdjacentElement('afterbegin', sliderSectionLast);
    slider.style.marginLeft = "-100%";
  }, 500);
}

btnRight.addEventListener('click', function(){
  Next();
});

btnLeft.addEventListener('click', function(){
  Prev();
});

setInterval(function(){
  Next();
}, 5000);


//campo suscribite
$('#btn-suscribe').on('click', () => {
  alert("Ya estas suscripto/a! Pronto recibiras novedades nuestras :)");
  });


//dark mode
const darkMode = () => {
  $("body").css("background", "black")
  $("h1").css("color", "white")
  $("p").css("color", "white")
  $("#nosotros").css("color", "white")
  $("h2").css("color", "white")
  $(".slider__title").css("color", "white")
  $(".slider__txt").css("color", "white")
  $(".main-header__txt").css("color", "white")
  
 
  localStorage.setItem("dark", "dark")
}

const lightMode = () => {
  $("body").css("background", "white")
  $("h1").css("color", "white")
  $("p").css("color", "black")
  $("#nosotros").css("color", "black")
  $("h2").css("color", "black")
  $(".slider__title").css("color", "white")
  $(".slider__txt").css("color", "white")
  $(".main-header__txt").css("color", "black")
  $(".footer__txt").css("color", "white")
  $(".footer__title").css("color", "white")
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