$(document).ready(function(){
    //Animaciones


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
    })
    $("#contrasena").on("blur", function(){
        if($("#contrasena").val() == ""){        
            $("#contrasenaLabel").css("bottom", "-31px");
            $("#contrasenaLabel").css("background-color", "transparent");
        }
    });

    $("#contrasenaConfirmar").on("focus", function(){
        $("#contrasenaLabelConfirmar").css("bottom", "-8px");
        $("#contrasenaLabelConfirmar").css("background-color", "white");
    })
    $("#contrasenaConfirmar").on("blur", function(){
        if($("#contrasenaConfirmar").val() == ""){        
            $("#contrasenaLabelConfirmar").css("bottom", "-31px");
            $("#contrasenaLabelConfirmar").css("background-color", "transparent");
        }
    });
    // Click label
    $("#nombreLabel").on("click", function(){
        $("#nombreLabel").css("bottom", "-8px");
        $("#nombreLabel").css("background-color", "white");
        $("#nombre").focus();
    });
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
    $("#contrasenaLabelConfirmar").on("click", function(){
        $("#contrasenaLabelConfirmar").css("bottom", "-8px");
        $("#contrasenaLabelConfirmar").css("background-color", "white");
        $("#contrasenaConfirmar").focus();
    });

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

    $("#aceptarTerminos").css({
        'opacity': '1'
    });
    //Botones

    $("#volver").on("click", function(){
        window.location.href = '/login'; 
    });
    $("#terminos").on("click", function(){
        window.location.href = '/terminos'; 
    });

    // Boton para registrarse.
    $("#registrarseBoton").on("click", function(){
        let invalido = "";
        // Validación de campos.
        while (true){
            if($("#nombre").val() == ""){
                invalido = "El nombre de usuario es obligatorio.";
                break;
            }
    
            if ($("#correo").val() == ""){
                invalido = "El correo es obligatorio.";
                break;
            }
            if (validarCorreo($("#correo").val()) == false) {
                console.log(validarCorreo($("#correo").val()));
                invalido = "El correo ingresado es inválido.";
            }
    
            if ($("#contrasena").val() == ""){
                invalido = "La contraseña es obligatoria.";
                break;
            } 
            if(validarContraseña($("#contrasena").val()) == false) {
                invalido = "La contraseña debe contener al menos 8 carácteres, el uso de mayúsculas y carácteres especiales.";
                break;
            }
            if ($("#contrasenaConfirmar").val() == ""){
                invalido = "Debe confirmar la contraseña.";
                break;
            }
    
            if($("#contrasena").val() != $("#contrasenaConfirmar").val()){
                invalido = "Las contraseñas ingresadas no coinciden.";
                break;
            }
            if($("#aceptarTerminos").is(":checked") == false){
                invalido = "Debes aceptar los términos y condiciones para continuar.";
                break;
            }
            break;
        }
        if(invalido == ""){
            console.log("EXITO REGISTRADO");
            $(".mostrarError").css({
                "opacity": "0",
                "margin-top": "-56px"
            })
            $.ajax({
                url: '/registro', // Reemplaza con la ruta correcta hacia tu función getUsuarios
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
            });
        }else{
            $(".mostrarError").text(invalido);
            $(".mostrarError").css({
                "opacity": "1",
                "margin-top": "0px"
            });
        }
    });
});
function validarCorreo(email) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function validarContraseña(contrasena) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-]).{8,}$/;
    return regex.test(contrasena);
}