import { guardarImagen } from '../js/three/threeGraficar.mjs';

let datos = {};
function getDatos() {
    return datos;
}

let imagenesSubir = [];

$(document).ready(function(){
    cargarModal();
    cargarFlotante();
    datosProyecto();
    capturarWebCam('user');  // user, environment

    
    $("#ayudaBoton").on("click", function() {
        console.log("holaaaa");
        $(".acciones").addClass("ocultar");
        $(".ayuda").removeClass("ocultar");
    });

    $("#volverBoton").on("click", function() {
        $(".ayuda").addClass("ocultar");
        $(".acciones").removeClass("ocultar");
    });

    $("body").on("click", "#tomarCaptura", function(){
        screenShot();
        $(".tutorialSpaceBar").remove();
    });

    $("body").on("click", "#tomarCapturaTemp", function(){
        $("#inputContainer").slideDown();
        $("#inputSec").change(function(){
            console.log($("#inputSec").val());
            if($("#inputSec").val()<=0 && $("#inputSec").val()!=""){
                ejecutarEmergente("Error", "Los segundos no pueden ser cero o valores negativos");
                return;
            }
            else if($("#inputSec").val()>0){
                var count = parseInt($(this).val());
                var countdownElement = $('<div class="countdown">' + count + '</div>');
                $('body').append(countdownElement);
                $("#overlay").css("display", "block");
                $(".tutorialSpaceBar").remove();
                var countdownInterval = setInterval(function() {
                    count--;
                    countdownElement.text(count);
                    if (count <= 0) {
                        clearInterval(countdownInterval);
                        countdownElement.remove();
                        screenShot(); // Llama a la función screenShot() una vez que se completa la cuenta regresiva
                        $("#overlay").css("display", "none");
                        $("#inputSec").val("");
                    }
                }, 1000);
                $("#inputContainer").hide();
                
            }else{
                ejecutarEmergente("Error","Ingrese la cantidad de segundos");
                return;
            }
        });
    });

    $("#exportarImagenes").on("click", function(){
        $(".seleccionado").each(function(){
            imagenesSubir.push([$(this).children().attr("src"), $(this).children().data("jpeg"), $(this).children().data("nombre_archivo")]);
        });
        if (imagenesSubir.length > 0) {
            let checkbox = '';
            checkbox += '<div class="contenedorCheckbox"><div class="divCheckbox"><input type="checkbox" id="png"><label for="png">.PNG</label></div><div class="divCheckbox"><input type="checkbox" id="jpeg"><label for="jpeg">.JPEG</label></div></div>';
            ejecutarAccion('Exportar imágenes', 'Por favor seleccione la extensión de imagen con la que desea exportar.<br>' + checkbox);
            $(".modalGlobalFooter").html('<button class="modalGlobalBoton" id="exportar">Exportar</button><button class="modalGlobalBoton" id="cancelarAccion">Cancelar</button>');
        }
    });

    
    $("body").on("click", "#exportar", function(){
        let $firstCheckedCheckbox = null;
        $("input[type='checkbox']").each(function() {
            let $checkbox = $(this);
            if ($checkbox.is(":checked") && !$firstCheckedCheckbox) {
                $firstCheckedCheckbox = $checkbox;
            }
        });

        let mime = $firstCheckedCheckbox.attr("id");

        for (let i = 0; i < imagenesSubir.length; i++) {
            var a = document.createElement("a"); 
            if (mime == "png") {
                a.href = imagenesSubir[i][0]; 
            } else {
                a.href = imagenesSubir[i][1]; 
            }
            a.download = imagenesSubir[i][2] + "." + mime;
            a.click(); 
        }
        imagenesSubir = [];
    
        $(".captura.seleccionado").each(function(){
            $(this).removeClass("seleccionado");
        });

        cerrarVentana();
    })

    $("body").on("change", "#png, #jpeg", function () {
        if ($(this).is(":checked")) {
            // Si se selecciona un checkbox, deselecciona el otro
            $("#png, #jpeg").not(this).prop("checked", false);
        }
    });


    
    // Seleccion de elementos   
    $("body").on("click", ".captura", function(event) {
        if (event.ctrlKey) {
            $(this).toggleClass("seleccionado");
        } else {
            if ($(this).hasClass("seleccionado")) {
                $(this).removeClass("seleccionado");
            } else {
                $(".captura").removeClass("seleccionado");
                $(this).addClass("seleccionado");
            }
        }
    });
    ////

    // HOTKEYS
    $("body").keyup(function(e){
        if(e.keyCode == 32){
            e.preventDefault();
            screenShot();
            $(".tutorialSpaceBar").remove();
        }
    });
    ////

    $("body").on("click", ".exit", function(){
        console.log("SEXO");
        setTimeout(() => {
            $(".modalFlotante").css({
                "display": "none"
            });
            }, "100");
    
        $(".modalFlotante").css({
            "opacity": "0",
            "height": "30vh",
            "width": "40vh"
        });
    
        $(".fondoModal").css({
            "display": "none"
        });
    });
    
    $("body").on("click", ".modalBoton", function(){
        setTimeout(() => {
            $(".modalFlotante").css({
                "display": "none"
            });
            }, "100");
    
        $(".modalFlotante").css({
            "opacity": "0",
            "height": "30vh",
            "width": "40vh"
        });
    
        $(".fondoModal").css({
            "display": "none"
        });
    });

    // Botones nav
    $('#volver').on("click", function(){
        ejecutarAccion('Abandonar', '¿Está seguro que desea abandonar el proyecto sin guardar?<br><br>■ ' + datos.nombre_proyecto);
        $(".modalGlobalFooter").html('<button class="modalGlobalBoton" id="guardarSalir">Guardar y salir</button><button class="modalGlobalBoton" id="salirSinGuardar">Salir sin guardar</button><button class="modalGlobalBoton" id="cancelarAccion">Cancelar</button>');
    });
    $('#guardar').on("click", function(){
        $(".modalFooter").html('<button class="modalBoton">Aceptar</button>');
        guardarEstado();
    });
    $('#exportar').on("click", function(){
        
    });
    $('#dispositivo').on("click", function(){
        
    });
    $('#opciones').on("click", function(){
        
    });
    $('#shaders').on("click", function(){
        
    });


    $("body").on("click", '#guardarSalir', function(){
        $(".modalFooter").html('<button class="modalBoton" id="aceptarGuardado">Aceptar</button>');
        guardarEstado();
    });
    $("body").on("click", '#salirSinGuardar', function(){
        window.location.href = 'proyectos';
    });
    $("body").on("click", '#cancelarAccion, #cerrarVentana', function(){
        cerrarVentana();
    });

    $("body").on("click", "#aceptarGuardado", function(){
        window.location.href = 'proyectos';
    })
});

function dataURLtoFile(dataurl, filename, mime) {
    var arr = dataurl.split(','),
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

function guardarEstado(){
    ejecutarEmergente('Proyecto guardado', 'El proyecto se ha guardado satisfactoriamente.', '<i class="fa-regular fa-floppy-disk" style="color: #16161a;"></i>');

    const formData = new FormData();

    let contadorImagenes = 0;
    $(".captura").each(function(){
        let archivo = dataURLtoFile($(this).children().attr("src"), $(this).children().data("nombre_archivo") + ".png", 'image/png');
        formData.append('images', archivo);
        contadorImagenes += 1;
    });

    formData.append('cantidad_imagenes', contadorImagenes);
    //formData.append('opciones');

    $.ajax({
        type: "POST",
        url: "/aplicacion/guardar", // La URL donde deseas enviar el archivo
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

let test = 0;
function screenShot() {
    const timestamp = new Date().getTime();
    const fileName = `${getDatos().nombre_proyecto}_${timestamp}`;
    const captura = `<div class="captura" style="color: white"><img src="${guardarImagen()[0]}" data-jpeg="${guardarImagen()[1]}" data-nombre_archivo="${fileName}"></div>`;
    $(captura).insertAfter(".herramienta .titulo");
    test++;
}

function capturarWebCam(camera) {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        const videoElement = document.querySelector('.contenedorUsuarioCamara video');
        navigator.mediaDevices.getUserMedia({ video: { facingMode: camera } })
            .then(function (stream) {
                videoElement.srcObject = stream;
            })
            .catch(function (error) {
                ejecutarEmergente("Error del dispositivo", "No se puede acceder a la cámara: " + error.message);
            });
    } else {
        ejecutarEmergente("Error del dispositivo", "Lo siento, al parecer tu navegador no soporta la ejecución de video.");
    }
}

function datosProyecto() {
    $.ajax({
        url: '/aplicacion/datosproyecto',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            if (data.Exito) {
                console.log(data);
                datos = data;
                document.title = data.nombre_proyecto;
            } else {
                ejecutarEmergente("", data.msg);
            }
        },
        error: function(error) {
            ejecutarEmergente("", error);
        }
    })
}

function ejecutarAccion(titulo, descripcion, botones){
    if (titulo == undefined || titulo == null || titulo == '') {
        titulo = 'Acción';
    }
    if (descripcion == undefined || descripcion == null || descripcion == '') {
        descripcion = '¿Continuar?';
    }
    $(".modalGlobalTitulo").text(titulo);
    $(".modalGlobalCuerpo").html('<span style="font-size: 2vh;">' + descripcion + '</span>');
    
    animacionVentana();
}

function ejecutarEmergente(titulo, descripcion, icono){
    setTimeout(() => {
        $(".modalFlotante").css({
            "opacity": "1",
            "height": "50vh",
            "width": "60vh"
        });
        $(".fondoModal").css({
            "display": "inline-block"
        });
        }, "100");

    $(".modalFlotante").css({
        "display": "inline-block"
    }); 
    
    if (titulo === undefined || titulo == ''){
        $(".modalTitulo").text("Ha ocurrido un error :(");
    } else {
        $(".modalTitulo").text(titulo);
    }

    if (descripcion === undefined || descripcion == ''){
        $(".modalTexto").text("No sabemos que ha ocurrido.");
    } else {
        $(".modalTexto").text(descripcion);
    }

    if (icono === undefined || descripcion == ''){
        $(".modalIcono").html('<i class="fa-solid fa-circle-xmark" style="color: #16161a;"></i>');
    } else {
        $(".modalIcono").html(icono);
    }
    
}

function cerrarVentana(){
    setTimeout(() => {
        $(".modalGlobal").css({
            "display": "none"
        });
        }, "100");
        $(".modalGlobal").css({
            "opacity": "0",
            "height": "28vh",
            "width": "45vh"
        });
    $(".fondoModal").css({
        "display": "none"
    });
}

function animacionVentana(){
    setTimeout(() => {
        $(".modalGlobal").css({
            "opacity": "1",
            "height": "38vh",
            "width": "55vh"
        });
        $(".fondoModal").css({
            "display": "inline-block"
        });
        }, "100");

    $(".modalGlobal").css({
        "display": "inline-block"
    }); 
}

function cargarFlotante() {
    let modal = '';
    modal += '<div class="fondoModal"></div>';
    modal += '<div class="modalFlotante">';
    modal += '    <div class="modalHeader">';
    modal += '        <div class="modalTitulo"></div>';
    modal += '        <i class="fa-solid fa-xmark exit" style="color: #16161a;"></i>';
    modal += '    </div>';
    modal += '    <div class="modalCuerpo">';
    modal += '        <div class="modalIcono">';
    modal += '        </div>';
    modal += '        <div class="modalTexto"></div>';
    modal += '    </div>';
    modal += '    <div class="modalFooter">';
    modal += '        <button class="modalBoton">Aceptar</button>';
    modal += '    </div>';
    modal += ' </div>';
    $("body").append(modal);
}

function cargarModal() {
    let modalGlobal = '';
    modalGlobal += '<div class="modalGlobal">';
    modalGlobal += '    <div class="modalGlobalHeader">';
    modalGlobal += '        <div class="modalGlobalTitulo"></div>';
    modalGlobal += '        <i class="fa-solid fa-xmark exit" style="color: #16161a;" id="cerrarVentana"></i>';
    modalGlobal += '    </div>';
    modalGlobal += '    <div class="modalGlobalCuerpo"></div>';
    modalGlobal += '    <div class="modalGlobalFooter">';
    modalGlobal += '        <button class="modalGlobalBoton" id="siguienteModal">Siguiente</button>';
    modalGlobal += '        <button class="modalGlobalBoton" id="cancelarModal">Cancelar</button>';
    modalGlobal += '    </div>';
    modalGlobal += '</div>';

    $("body").append(modalGlobal);
}

