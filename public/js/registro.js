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

    $(".contenedorTitulo").css({
        'opacity' : '1',
        'margin-left' : '100px'
    });

    $(".contenedorLogin").css({
        'width' : '28%',
        'height' : '60%'
    });
    $("#volver").css({
        'left': '0',
        'opacity': '1'
    });

    $("#aceptarTerminos").css({
        'opacity': '1'
    });
    //Botones
    $("#noCuenta").on("click", function(){
        window.location.href = 'registro'; 
    });

    $("#volver").on("click", function(){
        window.location.href = '/login'; 
    });
});