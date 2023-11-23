$(document).ready(function(){
      
  $('html, body').animate({scrollTop:0}, '1');


  const pie = $('.pie');
  const pregunta2 = $('.pregunta2');

  // Función para ajustar el padding-top del elemento .pie
  function ajustarPie() {
      const nuevoPaddingTop = pregunta2.height() + 18;
      pie.css('padding-top', nuevoPaddingTop + 'px');
  }

  // Llama a la función al cargar la página
  ajustarPie();

  // Agrega un evento de cambio de tamaño al elemento .pregunta2
  $(window).resize(ajustarPie);

  $(".fa-bars").on("click", function() {
    $("ul").toggleClass("show-menu");
  });

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

    $("#terminos").on("click", function(){
      window.location.href = 'terminos'; 
    });

    $("#manual").on("click", function(){
      window.location.href = 'manual'; 
    });

    $('.pregunta').click(function() {
      var icono = $(this).find('span');

      icono.toggleClass('rotado');
      $(this).find('.pregunta-respuesta').slideToggle();
  });
    
});