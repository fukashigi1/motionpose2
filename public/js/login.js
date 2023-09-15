$(document).ready(function(){
    //$("#parrafoTest").html("<p>Hola " + JSON.stringify(usuarios) + "</p>"); // Muestra los datos en el HTML
    
    // Estetica label login
    $("#correo").on("focus", function(){
        $("#correoLabel").css("bottom", "-8px");
        $("#correoLabel").css("background-color", "white");
    })
    $("#correo").on("blur", function(){
        if($("#correo").val() == ""){        
            $("#correoLabel").css("bottom", "-31px");
            $("#correoLabel").css("background-color", "transparent");
        }
    });

    $("#contrasena").on("focus", function(){
        $("#contrasenaLabel").css("bottom", "-8px");
        $("#contrasenaLabel").css("background-color", "white");
        $("#contrasenaLabel img").css("background-color", "white");
    })
    $("#contrasena").on("blur", function(){
        if($("#contrasena").val() == ""){        
            $("#contrasenaLabel").css("bottom", "-31px");
            $("#contrasenaLabel").css("background-color", "transparent");
            $("#contrasenaLabel img").css("background-color", "transparent");
        }
    });
    //Click en label de input
    $("#correoLabel").on("click", function(){
        $("#correoLabel").css("bottom", "-8px");
        $("#correoLabel").css("background-color", "white");
        $("#correo").focus();
    });
    $("#contrasenaLabel").on("click", function(){
        $("#contrasenaLabel").css("bottom", "-8px");
        $("#contrasenaLabel").css("background-color", "white");
        $("#contrasena").focus();
    });
    // Cambiar ojo de contraseña
    $("#contrasenaLabel img").on("click", function(){
        if($("#contrasenaLabel img").attr("src") == "icons/hide.png"){
            $("#contrasena").attr("type", "text");
            $("#contrasenaLabel img").attr("src", "icons/view.png");
            $("#contrasenaLabel img").attr("title", "Ocultar contraseña.");
        }else{
            $("#contrasena").attr("type", "password");
            $("#contrasenaLabel img").attr("src", "icons/hide.png");
            $("#contrasenaLabel img").attr("title", "Mostrar contraseña.");
        }
    });
    // Titulo y contenedor animación

    $(".contenedorTitulo").css({
        'opacity' : '1',
        'margin-left' : '100px'
    });

    $(".contenedorLogin").css({
        'width' : '28%',
        'height' : '63%'
    });
    $("#volver").css({
        'left': '0',
        'opacity': '1'
    });
    $("#noCuenta").on("click", function(){
        window.location.href = 'registro'; 
    });

    $("#continuarBoton").on("click", function(){
        $.ajax({
            url: '/login', 
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                correo: $("#correo").val(),
                contrasena: $("#contrasena").val()
            }),
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                if(data.Exito){
                    // Mandar a pagina principal
                    console.log("Solicitud POST exitosa");
                    window.location.href = 'lobby'; 
                }else{
                    $(".mostrarError").css({
                        "opacity": "1",
                        "margin-top": "0px"
                    });
                    $(".mostrarError").text("Correo o contraseña inválidos.");
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
        });
    });
});

