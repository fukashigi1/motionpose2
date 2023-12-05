$(document).ready(function(){
  $('html, body').animate({scrollTop:0}, '1');

  $(".fa-bars").on("click", function() {
    $("ul").toggleClass("show-menu");
  });

  const secciones = document.querySelectorAll('.card');
  const enlaces = document.querySelectorAll('.lista a');

// Función para verificar si una sección está en la vista
const estaEnVista = (elemento) => {
  const rect = elemento.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
};

// Función para resaltar el enlace y la sección actual
const actualizarEnlaceYSeccionActiva = () => {
  secciones.forEach((seccion, index) => {
      const enlace = enlaces[index];
      if (estaEnVista(seccion)) {
          enlaces.forEach((e) => e.classList.remove('selected'));
          enlace.classList.add('selected');
          secciones.forEach((s) => s.classList.remove('selected'));
          seccion.classList.add('selected');
      }
  });
};

// Actualizar enlace y sección activa al cargar la página y al desplazarse
window.addEventListener('load', actualizarEnlaceYSeccionActiva);
window.addEventListener('scroll', actualizarEnlaceYSeccionActiva);

  $(window).scroll(function() {
      var distanciaTop = $(window).scrollTop();
      if (distanciaTop >= 20) {
        $(".header").css("background-color", "#16161a");
      } else {
        $(".header").css("background-color", "#ffffff00");
      }
    });

    $('.imgLogo, #volverArriba').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    });
    
    $("#probar").on("click", function(){
      window.location.href = 'login'; 
    });

    $("#inicio").on("click", function(){
      window.location.href = '/'; 
    });

    $("#politicas").on("click", function(){
      window.location.href = 'politicas'; 
    });

    $("#terminos").on("click", function(){
      window.location.href = 'terminos'; 
    });
    
});