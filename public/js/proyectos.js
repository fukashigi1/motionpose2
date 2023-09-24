$(document).ready(function(){
    
    $("body").on("click", ".nuevoProyecto", function(){
        window.location.href = 'lobby';
    });

    $.ajax({
        url: '/proyectos/obtenerproyectos',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            if(data.Exito == true) {
                console.log("Exito");
                desplegarProyectos(data.proyectos);
            }else{
                console.error("Solicitud POST DENEGADA");
                ejecutarModal("Ha ocurrido un error :(", data.msg, '<i class="fa-solid fa-heart-crack" style="color: #16161a;"></i>');
            }
        },
        error: function(error) {
            console.error(error);
        }
    });

});
function desplegarProyectos(proyectos){
    console.log(proyectos);
    console.log(proyectos.length);

    if (proyectos.length == 0) {
        console.log("hola");
        let boton = '<button class="nuevoProyecto" id="nuevoProyecto">Nuevo proyecto</button>';
        $(".contenedorElementos").html(boton);

    } else {
        let elementoProyecto = '<button class="nuevoProyecto" id="nuevoProyectoHidden">Nuevo proyecto</button>';
    
        for (let i = 0; i < proyectos.length; i++){
            elementoProyecto += '<div class="elemento" id="' + proyectos[i].id_proyecto + '">';

            if (proyectos[i].tipo_proyecto == "Imagen") {
                elementoProyecto += '    <i class="fa-solid fa-file-image" style="color: #ffffff;"></i>';
            } else if (proyectos[i].tipo_proyecto == "Video"){
                elementoProyecto += '    <i class="fa-solid fa-file-video" style="color: #ffffff;"></i>';
            } else if (proyectos[i].tipo_proyecto == "3D") {
                elementoProyecto += '    <i class="fa-solid fa-cube" style="color: #ffffff;"></i>';
            } else if (proyectos[i].tipo_proyecto == "Animacion"){
                elementoProyecto += '    <i class="fa-solid fa-hand-sparkles" style="color: #ffffff;"></i>';
            } else {
                elementoProyecto += '    <i class="fa-solid fa-notdef" style="color: #ffffff;"></i>';
            }
            
            elementoProyecto += '    <label>' + proyectos[i].nombre_proyecto + '</label>';
            elementoProyecto += '</div>';
    
            $(".contenedorElementos").append(elementoProyecto);
        }
    }
}