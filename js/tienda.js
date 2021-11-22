
//menu desplegable

let btnMenu = document.getElementById('btn-menu');
let mainNav = document.getElementById('main-nav');
btnMenu.addEventListener('click', function(){
  mainNav.classList.toggle('mostrar');
});


//tienda


window.onload = function () {

    const Productos = [
        {
            id: 1,
            nombre: 'Maceta Flora',
            precio: 650,
            imagen: '../multimedia/macetaFlora.png',
        },
        {
            id: 2,
            nombre: 'Maceta Geo',
            precio: 800,
            imagen: '../multimedia/macetaGeo.png',
        },
        {
            id: 3,
            nombre: 'Maceta Canelón',
            precio: 750,
            imagen: '../multimedia/macetaCanelon.png',
        },
        {
            id: 4,
            nombre: 'Combo Paila Terrario',
            precio: 1500,
            imagen: '../multimedia/comboPaila.png',
        },
        {
            id: 5,
            nombre: 'Combo Maceta con Bandeja Oval',
            precio: 1100,
            imagen: '../multimedia/bandejaOval.png',
        },
        {
            id: 6,
            nombre: 'Combo Maceta con Bandeja Recta',
            precio: 1100,
            imagen: '../multimedia/bandejaRectangular.png',
        },
    ];

    let carrito = [];
    let total = 0;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

    /**
    * Crea productos a partir de los productos 
    */
    function renderizarProductos() {
        Productos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h4');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('h2');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = "$ "+ `${info.precio}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', añadirProductoAlCarrito);
    

            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito 
    */
    function añadirProductoAlCarrito(evento) {
        // Añadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Cálculo del total
        calcularTotal();
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = Productos.filter((itemProductos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemProductos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem}  ${miItem[0].nombre} $${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'ELIMINAR';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos nuevamente el precio
        calcularTotal();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }


    function calcularTotal() {
        // Limpiamos el monto anterior
        total = 0;
        // Recorremos el array del carrito
        carrito.forEach((item) => {
            // De cada elemento obtenemos su precio
            const miItem = Productos.filter((itemProductos) => {
                return itemProductos.id === parseInt(item);
            });
            total = total + miItem[0].precio;
        });
        // Renderizamos el precio en el HTML
        DOMtotal.textContent = total.toFixed(2);
    }

    /**
    * Vaciar el carrito y volver a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    calcularTotal();
    renderizarCarrito();
}



//boton finalizar compra

$('#finalizarComprar').on('click', () => {
    alert("Gracias por tu compra!. Tu pedido sera preparado a la brevedad");
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
    $("#nosotros").css("color", "white")
    $("h2").css("color", "white")
    $(".slider__title").css("color", "white")
    $(".slider__txt").css("color", "white")
    $(".main-header__txt").css("color", "white")
    $(".menu__item").css("color", "white")
   
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

