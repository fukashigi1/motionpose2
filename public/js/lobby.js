$(document).ready(function(){
    $("#nombre").on("focus", function(){
        $("#nombreLabel").css("bottom", "-8px");
        $("#nombreLabel").css("background-color", "white");
    })
    $("#nombre").on("blur", function(){
        if($("#nombre").val() == ""){        
            $("#nombreLabel").css("bottom", "-31px");
            $("#nombreLabel").css("background-color", "transparent");
        }
    });

    // Crear nuevo proyecto formulario

    $("#imagenElemento").on("click", function(){
        animacionVentana();
        $("#selectorElemento").val('imagen').change();
    });

    $("#videoElemento").on("click", function(){
        animacionVentana();
        $("#selectorElemento").val('video').change();
    });

    $("#3dElemento").on("click", function(){
        animacionVentana();
        $("#selectorElemento").val('3d').change();
    });

    $("#animacionElemento").on("click", function(){
        animacionVentana();
        $("#selectorElemento").val('animacion').change();
    });

    $("#cerrarVentana, #cancelarModal").on("click", function(){
        setTimeout(() => {
            $(".modalCrearProyecto").css({
                "display": "none"
            });
            }, "100");
            $(".modalCrearProyecto").css({
                "opacity": "0",
                "height": "28vh",
                "width": "45vh"
            });
        $(".fondoModal").css({
            "display": "none"
        });
    })

    $("#siguienteModal").on("click", function(){

        if($("#nombre").val() == '' || $("#nombre").val() === undefined){
            ejecutarModal('', 'El nombre del proyecto no puede estár vacío.', '<i class="fa-regular fa-face-surprise" style="color: #16161a;"></i>');
        } else if ($("#nombre").val().length > 30){
            ejecutarModal('', 'El nombre del proyecto puede tener como máximo 30 carácteres.', '<i class="fa-regular fa-face-surprise" style="color: #16161a;"></i>');
        } else if ($("#selectorElemento").val() == '' || $("#selectorElemento").val() === undefined || ($("#selectorElemento").val() !== 'imagen' && $("#selectorElemento").val() !== 'video' && $("#selectorElemento").val() !== '3d' && $("#selectorElemento").val() !== 'animacion')) {
            ejecutarModal('', 'Debes seleccionar una opción válida.', '<i class="fa-regular fa-face-surprise" style="color: #16161a;"></i>');
        } else {
            $.ajax({
                url: '/lobby/crear',
                method: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    nombre_proyecto: $("#nombre").val(),
                    tipo_proyecto: $("#selectorElemento").val()
                }),
                contentType: 'application/json',
                success: function(data) {
                    console.log(data);
                    if(data.Exito){
                        
                    }else{
                        ejecutarModal('', data.msg, '<i class="fa-regular fa-face-sad-tear" style="color: #16161a;"></i>');
                        console.error("Solicitud POST DENEGADA");
                    }
                },
                error: function(error) {
                    ejecutarModal();
                    console.error(error);
                }
            });
        }
    });
});

function animacionVentana(){
    setTimeout(() => {
        $(".modalCrearProyecto").css({
            "opacity": "1",
            "height": "38vh",
            "width": "55vh"
        });
        $(".fondoModal").css({
            "display": "inline-block"
        });
        }, "100");

    $(".modalCrearProyecto").css({
        "display": "inline-block"
    }); 
}