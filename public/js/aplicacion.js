let datos = {};
function getDatos() {
    return datos;
}
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
            var count = parseInt($(this).val());
            var countdownElement = $('<div class="countdown">' + count + '</div>');
            $('body').append(countdownElement);
            $("#overlay").css("display", "block");
            var countdownInterval = setInterval(function() {
                count--;
                countdownElement.text(count);
                if (count <= 0) {
                    clearInterval(countdownInterval);
                    countdownElement.remove();
                    screenShot(); // Llama a la función screenShot() una vez que se completa la cuenta regresiva
                    $("#overlay").css("display", "none");
                    $("#inputSec").val(0);
                }
            }, 1000);
            $("#inputContainer").hide();
        });
    });

    $("body").keyup(function(e){
        if(e.keyCode == 32){
            e.preventDefault();
            screenShot();
            $(".tutorialSpaceBar").remove();
        }
    });

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
});

let test = 0;

function screenShot() {
    const canvasElement = document.querySelector('.output_canvas'); // Reemplaza 'tu-clase-de-canvas' con la clase de tu elemento <canvas>
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = canvasElement.width; // Usa el ancho del elemento <canvas>
    canvas.height = canvasElement.height; // Usa el alto del elemento <canvas>
    context.drawImage(canvasElement, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(function (blob) {
        const timestamp = new Date().getTime();
        const formattedDate = new Date(timestamp).toLocaleDateString('es-ES').replace(/\D/g, '');
        const fileName = `${getDatos().nombre_proyecto}_${test}_${formattedDate}.png`;
        blob.name = fileName;
        const url = URL.createObjectURL(blob);
        const captura = `<div class="captura" style="color: white"><img src="${url}"></div>`;
        $(captura).insertAfter(".herramienta .titulo");
    });
    test++;
}

function urlToFile(url, fileName, mimeType) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => new File([buffer], fileName, { type: mimeType }));
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

