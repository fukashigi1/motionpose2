$(document).ready(function(){
    $.ajax({
        url: '/lobby/name', // Reemplaza con la ruta correcta hacia tu función getUsuarios
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            desplegarNombre(data);
        },
        error: function(error) {
            console.error(error);
        }
    });
    
});
function desplegarNombre(nombre){
    $('#test').text(nombre.name);
}