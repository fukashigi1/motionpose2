$(document).ready(function(){
    
    $(".nuevoProyecto").on("click", function(){
        window.location.href = 'lobby';
    });
});
function desplegarNombre(nombre){
    $('#test').text(nombre.name);
}