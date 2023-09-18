$(document).ready(function(){

    $('html, body').animate({scrollTop:0}, '1');

    $(window).scroll(function() {
        var distanciaTop = $(window).scrollTop();
        if (distanciaTop >= 20) {
          $(".header").css("background-color", "#16161a");
        } else {
          $(".header").css("background-color", "#ffffff00");
        }
      });

      $('#volverArriba').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
      });
    
    $(".nuevoProyecto").on("click", function(){
        window.location.href = 'lobby';
    });
});
function desplegarNombre(nombre){
    $('#test').text(nombre.name);
}