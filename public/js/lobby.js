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
        
        /*$.ajax({
            url: '/crear',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                nombre: $("#nombre").val(),
                correo: $("#correo").val(),
                contrasena: $("#contrasena").val()
            }),
            contentType: 'application/json',
            success: function(data) {
                if(data.Exito){
                    console.log(data);
                    window.location.href = 'login'; 
                    
                }else{
                    console.error("Solicitud POST DENEGADA");
                }
                $(".mostrarError").text(data.msg);
                $(".mostrarError").css({
                    "opacity": "1",
                    "margin-top": "0px"
                });
            },
            error: function(error) {
                console.error(error);
            }
        });*/
    });

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