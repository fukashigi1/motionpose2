$(document).ready(function(){

    // Nav
    $('.imgLogo').on('click', function(e) {
        window.location.href = '/';
      });
    $("#inicio").on("click", function(){
        window.location.href = '/lobby';
    });
    $("#misProyectos").on("click", function(){
        window.location.href = '/proyectos';
    });
    $("#miCuenta").on("click", function(){
        window.location.href = '/cuenta';
    });
    $("#tienda").on("click", function(){
        window.location.href = '/tienda';
    });
    $("#cerrarSesion").on("click", function(){
        window.location.href = 'lobby/salir';
    });
});
