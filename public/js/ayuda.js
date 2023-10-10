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

    $("p").css({
        "margin-left": "150px",
        "margin-right": "150px",
        "font-size": "2.2vh",
        "line-height": "30px",
        "margin-bottom": "30px"
    });

    $('.pregunta').click(function() {
        var icono = $(this).find('span');

        icono.toggleClass('rotado');
        $(this).find('.pregunta-respuesta').slideToggle();
    });
});

