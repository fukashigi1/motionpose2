$(document).ready(function(){
    
    $("body").on("click", ".nuevoProyecto", function(){
        window.location.href = 'lobby';
    });

    // Menu de contexto
    var elementoClick;
    $("body").on("contextmenu", ".elemento", function(e){
        elementoClick = this.id;
        $(".menuContexto").css({
            "display": "inline-block"
        }); 
        $(".menuContexto").css({
            opacity: "1",
            left: e.pageX + "px",
            top: e.pageY + "px"
        });
        $(".ul").css({
            "height": "100%"
        });
        return false;
    });

    $(".li").on("click", function(){
        let idLi = $(this).attr("id");

        if(idLi == "cambiarNombre") {
            console.log(elementoClick);
        }
    });

    $('html').click(function(){
        ocultarMenuContexto();
    });

    $('html').contextmenu(function(){
        ocultarMenuContexto();
    });


    // Ajax para obtener elementos

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
    
        for (let i = 0; i < proyectos.length; i++){
            let elementoProyecto = '';
            console.log(i);
            elementoProyecto += '<div class="elemento" id="' + proyectos[i].id_proyecto + '">';

            if (proyectos[i].tipo_proyecto == "imagen") {
                elementoProyecto += '    <i class="fa-solid fa-file-image" style="color: #ffffff;"></i>';
            } else if (proyectos[i].tipo_proyecto == "video"){
                elementoProyecto += '    <i class="fa-solid fa-file-video" style="color: #ffffff;"></i>';
            } else if (proyectos[i].tipo_proyecto == "3d") {
                elementoProyecto += '    <i class="fa-solid fa-cube" style="color: #ffffff;"></i>';
            } else if (proyectos[i].tipo_proyecto == "animacion"){
                elementoProyecto += '    <i class="fa-solid fa-hand-sparkles" style="color: #ffffff;"></i>';
            } else {
                elementoProyecto += '    <i class="fa-solid fa-notdef" style="color: #ffffff;"></i>';
            }
            
            elementoProyecto += '    <label>' + proyectos[i].nombre_proyecto + '</label>';
            elementoProyecto += '</div>';
    
            $(".contenedorElementos").append(elementoProyecto);
        }
    }
    $(".contenedorElementos").append('<button class="nuevoProyecto" id="nuevoProyectoHidden">Nuevo proyecto</button>');
}

function ocultarMenuContexto(){
    setTimeout(() => {
        $(".menuContexto").css({
            "display": "none"
        });
        }, "100");
    $(".menuContexto").css({
        "opacity": "0"
    });
    $(".ul").css({
        "height": "38px",
    });
}