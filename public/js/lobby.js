$(document).ready(function(){
    $.ajax({
        url: '/lobby/datos', // Reemplaza con la ruta correcta hacia tu función getUsuarios
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.error(error);
        }
    });
});