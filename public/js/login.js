$(document).ready(function(){
    $.ajax({
        url: '/api/obtenerUsuarios', // Reemplaza con la ruta correcta hacia tu función getUsuarios
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            if(data.Exito){
                console.log(data.usuarios);
                $("#parrafoTest").html("<p>Hola " + JSON.stringify(data.usuarios) + "</p>");
            }else{
                console.error("No hubo exito en el if: " + data.Exito);
                $("#parrafoTest").html("<p>Hola " + JSON.stringify(data.usuarios) + "</p>");

            }
            
        },
        error: function(error) {
            console.error(error);
        }
    });
    //$("#parrafoTest").html("<p>Hola " + JSON.stringify(usuarios) + "</p>"); // Muestra los datos en el HTML
    $('h1').textfill({
        minFontPixels: 400,
        maxFontPixels: 1000
    });
});