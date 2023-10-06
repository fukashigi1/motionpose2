$(document).ready(function(){
    
    $("body").on("click", ".nuevoProyecto", function(){
        window.location.href = 'lobby';
    });
 
    // Continuar con el proyecto
    let elemento;
    $("body").on("click", ".elemento", function() {
        elemento = $(this).attr("id");
        continuarProyecto($("#" + elemento + " label").text());
    
        $("body").off("click", "#siguienteModal");
    
        $("body").on("click", "#siguienteModal", function() {
            $.ajax({
                url: '/proyectos/continuar',
                method: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    id: elemento
                }),
                contentType: 'application/json',
                success: function(data) {
                    console.log(data);
                    if (data.Exito) {
                    } else {
                        console.error("Solicitud POST DENEGADA");
                    }
                },
                error: function(error) {
                    ejecutarModal("", error.msg);
                    console.error(error);
                }
            });
        });
    });

    
    

    // Menu de contexto
    let elementoClick;
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

    $(".li").on("click", function () {
        let idLi = $(this).attr("id");
    
        if (idLi == "cambiarNombre") {
            let $label = $("#" + elementoClick + " label");
            let nombrePrevio = $label.text();
            let enterPressed = false; // Bandera para controlar si se presionó Enter
    
            if ($label.attr('contentEditable')) {
                $label.removeAttr('contentEditable');
                $label.off('keydown');
                $label.off('blur');
    
            } else {
                $label.attr('contentEditable', true);
                $label.focus();
    
                let range = document.createRange();
                range.selectNodeContents($label.get(0));
                let selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
    
                $label.off('keydown');
                $label.on('keydown', function (event) {
                    if (event.key === "Enter") {
                        enterPressed = true; // Marcar que se presionó Enter
                        if ($label.text() == "" || $label.text() === undefined) {
                            ejecutarModal("Nombre inválido", "El nombre del proyecto no puede estar vacío.", '<i class="fa-solid fa-circle-xmark" style="color: #16161a;"></i>');
                            $label.text(nombrePrevio);
                            $label.removeAttr('contentEditable');
                        } else if ($label.text().length > 30) {
                            ejecutarModal("Nombre inválido", "El nombre del proyecto puede tener como máximo 30 caracteres.", '<i class="fa-solid fa-circle-xmark" style="color: #16161a;"></i>');
                            $label.text(nombrePrevio);
                            $label.removeAttr('contentEditable');
                        } else {
                            $label.blur();
                            $label.removeAttr('contentEditable');
                            $.ajax({
                                url: '/proyectos/cambiarnombre',
                                method: 'POST',
                                dataType: 'json',
                                data: JSON.stringify({
                                    nombre: $label.text(),
                                    id: elementoClick
                                }),
                                contentType: 'application/json',
                                success: function (data) {
                                    console.log(data);
                                    if (data.Exito) {
                                        ejecutarModal('Nombre cambiado', "El nombre fue cambiado satisfactoriamente.", '<i class="fa-regular fa-face-smile" style="color: #16161a;"></i>');
                                    } else {
                                        ejecutarModal('', data.msg, '<i class="fa-regular fa-face-sad-tear" style="color: #16161a;"></i>');
                                        console.error("Solicitud POST DENEGADA");
                                    }
                                },
                                error: function (error) {
                                    ejecutarModal("", error.msg);
                                    console.error(error);
                                }
                            });
                        }
                    }
                    if (event.key === "Escape") {
                        $label.text(nombrePrevio);
                        $label.removeAttr('contentEditable');
                    }
                });
    
                $label.off('blur');
                $label.on('blur', function () {
                    if (!enterPressed) { // Restaurar el texto anterior solo si no se presionó Enter antes
                        $label.text(nombrePrevio);
                    }
                    enterPressed = false; // Restablecer la bandera
                    $label.removeAttr('contentEditable');
                });
            }
        } else if (idLi == "eliminar") {
            let $elemento = $("#" + elementoClick).attr("id");
            let nombreElemento = $("#" + elementoClick).text();
            console.log(nombreElemento);
            desplegarModal(nombreElemento);
            $("body").on("click", "#siguienteModal", function(){
                $.ajax({
                    url: '/proyectos/eliminarproyecto',
                    method: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        id: $elemento
                    }),
                    contentType: 'application/json',
                    success: function (data) {
                        console.log(data);
                        if (data.Exito) {
                            ejecutarModal('Proyecto eliminado', 'El proyecto "' + nombreElemento +' " fue eliminado satisfactoriamente.', '<i class="fa-regular fa-face-smile" style="color: #16161a;"></i>');
                        } else {
                            ejecutarModal('', data.msg, '<i class="fa-regular fa-face-sad-tear" style="color: #16161a;"></i>');
                            console.error("Solicitud POST DENEGADA");
                        }
                    },
                    error: function (error) {
                        ejecutarModal("", error.msg);
                        console.error(error);
                    },
                    complete: function() {
                        llamarElementos();
                        
                        $(".modalCrearProyecto").css({
                            "display": "none"
                        });
                    }
                });
                $("body").off("click", "#siguienteModal");
            });
        }
    });

    $('html').click(function(){
        ocultarMenuContexto();
    });

    $('html').contextmenu(function(){
        ocultarMenuContexto();
    });

    // Ajax para obtener elementos
    llamarElementos();
    

});

function llamarElementos() {
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
}

function desplegarProyectos(proyectos){

    if (proyectos.length == 0) {
        let boton = '<button class="nuevoProyecto" id="nuevoProyecto">Nuevo proyecto</button>';
        $(".contenedorElementos").html(boton);
        $(".centro h1").text("¿No tienes proyectos?");

    } else {
        $(".contenedorElementos").empty();
        $(".centro h1").text("Continuar con un proyecto");
        for (let i = 0; i < proyectos.length; i++){
            let elementoProyecto = '';
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
        $(".contenedorElementos").append('<button class="nuevoProyecto" id="nuevoProyectoHidden">Nuevo proyecto</button>');
    }
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
function desplegarModal(elemento){
    $(".modalCrearProyectoTitulo").text("¿Está seguro?");
    let cuerpo = '';
    cuerpo += '<span style="font-size: 2vh;">¿Está seguro que desea eliminar el siguiente proyecto?<br><br>■ ' + elemento + '<br><br>Esta acción es irreversible.</span>';
    
    $(".modalCrearProyectoCuerpo").html(cuerpo);
    animacionVentana();
}

function continuarProyecto(elemento){
    $(".modalCrearProyectoTitulo").text("¿Continuar?");
    let cuerpo = '';
    cuerpo += '<span style="font-size: 2vh;">¿Quiere continuar con el proyecto?<br><br>■ ' + elemento + '</span>';
    /// botones $("#siguienteModal")
    $(".modalCrearProyectoCuerpo").html(cuerpo);
    animacionVentana();
}