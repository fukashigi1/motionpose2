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

    $(".elemento").on("click", function(){
        desplegarModal($(this).attr("id"));
    });

    $("body").on("click", "#siguienteModal", function(){

        if($("#nombre").val() == '' || $("#nombre").val() === undefined){
            ejecutarModal('', 'El nombre del proyecto no puede estár vacío.', '<i class="fa-solid fa-circle-xmark" style="color: #16161a;"></i>');
        } else if ($("#nombre").val().length > 30){
            ejecutarModal('', 'El nombre del proyecto puede tener como máximo 30 carácteres.', '<i class="fa-solid fa-circle-xmark" style="color: #16161a;"></i>');
        } else if ($("#selectorElemento").val() == '' || $("#selectorElemento").val() === undefined || ($("#selectorElemento").val() !== 'imagen' && $("#selectorElemento").val() !== 'video' && $("#selectorElemento").val() !== '3d' && $("#selectorElemento").val() !== 'animacion')) {
            ejecutarModal('', 'Debes seleccionar una opción válida.', '<i class="fa-solid fa-circle-xmark" style="color: #16161a;"></i>');
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
                },
                complete: function(){
                    $(".modalCrearProyecto").css({
                        "display": "none"
                    });
                    ejecutarModal('Proyecto creado', "El proyecto fue creado satisfactoriamente", '<i class="fa-regular fa-face-laugh" style="color: #16161a;"></i>');
                    $(".modalBoton").on("click", function(){
                        window.location.href = '/proyectos';
                    });
                }
            });
        }
    });
});

function desplegarModal(elemento){
    $(".modalCrearProyectoTitulo").text("Creando nuevo proyecto");
    let cuerpo = '';
    cuerpo += '<form>';
    cuerpo += '            <div style="margin-top: 10px">';
    cuerpo += '                <label id="nombreLabel" for="nombre" class="labelInput" >Nombre del proyecto</label>';
    cuerpo += '                <input id="nombre" type="text" class="input" maxlength="30">';
    cuerpo += '            </div>';
    cuerpo += '            <select name="select" class="input" id="selectorElemento" style="width: 102.5%; height: 43px;">';
    cuerpo += '                <option value="imagen">Imagen</option>';
    cuerpo += '                <option value="video">Video</option>';
    cuerpo += '                <option value="3d">3D</option>';
    cuerpo += '                <option value="animacion">Animación</option>';
    cuerpo += '              </select>';
    cuerpo += '        </form>';

    $(".modalCrearProyectoCuerpo").html(cuerpo);
    $("#selectorElemento").val(elemento).change();
    animacionVentana();
}