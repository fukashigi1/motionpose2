import { guardarImagen } from '../js/three/threeGraficar.mjs';

let tomandoTemporizada = false;

let datos = {};
function getDatos() {
    return datos;
}

let imagenesSubir = [];

let teclas = []
let anterior;

let data = {
    opcionGuardadoAutomatico : false,
    opcionTemporizadorSegundos: 4,
    opcionFormatoImagen: 'exportarPNG',
    hotkeys: {
        opcionesHotCaptura: [['SPACE', 32], ['T', 84]],
        opcionesHotTemporizador: [['R', 82]],
        opcionesHotExportar: [['E', 69]]
    }
}
let opcionesHotCaptura = {}; 
let opcionesHotTemporizador = {}; 
let opcionesHotExportar = {}; 

let hotkeysIniciales = []
$(document).ready(function(){
    cargarModal();
    cargarFlotante();
    datosProyecto();
    capturarWebCam('user');  // user, environment
    cargarOpciones(data); // cambiar por ajax
    
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

    function tomarCapturaTemp(segundos){
        if (tomandoTemporizada == false) {
            tomandoTemporizada = true;
            if(segundos<=0 && segundos!=""){
                ejecutarEmergente("Error", "Los segundos no pueden ser cero o valores negativos");
                return;
            }
            else if(segundos>0){
                var count = parseInt(segundos);
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
                
                setTimeout(() => { // Contador para impedir que tome otra temporizada durante una temporizada
                    tomandoTemporizada = false;
                  }, data.opcionTemporizadorSegundos * 1000);

                $("#inputContainer").hide();
                
            }else{
                ejecutarEmergente("Error","Ingrese la cantidad de segundos");
                return;
            }
        }
    }

    $("body").on("click", "#tomarCapturaTemp", function(){
        $("#inputContainer").slideDown();
        $("#inputSec").change(function(){
            tomarCapturaTemp($("#inputSec").val())
        });
    });

    $("#exportarImagenes, #exportar").on("click", function(){
        $(".seleccionado").each(function(){
            imagenesSubir.push([$(this).children().attr("src"), $(this).children().data("jpeg"), $(this).children().data("nombre_archivo")]);
        });
        if (imagenesSubir.length > 0) {
            let checkbox = '';
            checkbox += '<div class="contenedorCheckbox"><div class="divCheckbox"><input type="checkbox" id="png"><label for="png">.PNG</label></div><div class="divCheckbox"><input type="checkbox" id="jpeg"><label for="jpeg">.JPEG</label></div></div>';
            ejecutarAccion('Exportar imágenes', 'Por favor seleccione la extensión de imagen con la que desea exportar.<br>' + checkbox);
            $(".modalGlobalFooter").html('<button class="modalGlobalBoton" id="exportarModal">Exportar</button><button class="modalGlobalBoton" id="cancelarAccion">Cancelar</button>');
        }
    });

    
    $("body").on("click", "#exportarModal", function(){
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

    codeSetHotKey(data.hotkeys.opcionesHotCaptura, opcionesHotCaptura)
    codeSetHotKey(data.hotkeys.opcionesHotTemporizador, opcionesHotTemporizador)
    codeSetHotKey(data.hotkeys.opcionesHotExportar, opcionesHotExportar)
    function codeSetHotKey(hotkey, codeset){
        for (let i = 0; i < hotkey.length; i++){
            //console.log(hotkeys.opcionesHotCaptura[i][1])
        
            codeset[hotkey[i][1]] = false;
    
        }
    }
    // HOTKEYS
    $("body").on("keydown", function(e){
        // TOMAR CAPTURA - opcionesHotCaptura
        if(detectorHotkeyinKey(true, e, opcionesHotCaptura)){
            e.preventDefault();
            screenShot();
            $(".tutorialSpaceBar").remove();
        } else if(detectorHotkeyinKey(true, e, opcionesHotTemporizador )){// TEMPORIZADOR - opcionesHotTemporizador
            
            e.preventDefault();
            tomarCapturaTemp(data.opcionTemporizadorSegundos)
        }
    }).on('keyup', function (e) {
        detectorHotkeyinKey(false);

    });
    ////

    function detectorHotkeyinKey(bool, e, opcionesHot ){
        if (bool){
            if(e.keyCode in opcionesHot){
                opcionesHot[e.keyCode] = true;
            }
            let valores = Object.values(opcionesHot);
            const sonTodosTrue = valores.every(elemento => elemento);
            return sonTodosTrue;
        } else {
            borrarAccion()
        }
    }

    function borrarAccion(){
        Object.keys(opcionesHotCaptura).forEach(key => {
            opcionesHotCaptura[key] = false;
        });
        Object.keys(opcionesHotTemporizador).forEach(key => {
            opcionesHotTemporizador[key] = false;
        });
    }

    //Lector de hotkeys nuevos hotkeysIniciales
    function lectorHotkeysNuevos(){
        let elementosHotArray = []
        $('[id^="opcionesHot"]').each(function(){
            elementosHotArray.push($(this))
        })
        let hotkeyCambiados = []
        for (let i = 0; i < elementosHotArray.length; i++) {
            if ($(elementosHotArray[i]).val() != $(hotkeysIniciales[i]).val()) {
                hotkeyCambiados.push($(elementosHotArray[i]))
            }
        }


        for (let i = 0; i < hotkeyCambiados.length; i++) {
            console.log($(hotkeyCambiados[i]).attr('id'), data.hotkeys)
            if ($(hotkeyCambiados[i]).attr('id') in data.hotkeys) {
                let valor = data.hotkeys[$(hotkeyCambiados[i]).attr('id')];
                let objetoMomentaneo = {}
                if ($(hotkeyCambiados[i]).attr('id') == 'opcionesHotCaptura') {
                    for (let x = 0; x < valor.length; x++) {
                        for (let z = 0; z < valor[x].length; z++) {
                            objetoMomentaneo[valor[x][z][1]] = false;
                        }
                    }
                    opcionesHotCaptura = objetoMomentaneo;
                } else if ($(hotkeyCambiados[i]).attr('id') == 'opcionesHotTemporizador') {
                    console.log("aqui")
                    for (let x = 0; x < valor.length; x++) {
                        for (let z = 0; z < valor[x].length; z++) {
                            objetoMomentaneo[valor[x][z][1]] = false;
                        }
                    }
                    opcionesHotTemporizador = objetoMomentaneo;
                }
            }
        }
    }
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
    
    $('#dispositivo').on("click", function(){
        
    });

    $('#preferencias').on("click", function(){
        hotkeysIniciales = []
        $(".modalOpciones").css('display', 'block')
        let arrayHotkeys = $('[id^="opcionesHot"]').clone();
        for (let i = 0; i< arrayHotkeys.length; i++) {
            hotkeysIniciales.push($(arrayHotkeys[i]))
        }

        //ENCONTRADO EL BUG, CUANDO SE AGREGA EL ELEMENTO JQUERY SE MANTIENE, NO ES UNA COPIA (cambiado de .toarray por .clone)
    });
    $('#shaders').on("click", function(){
        
    });


    // PREFERENCIAS 
    $('input').on("keyup", function(e){
        if(e.keyCode == 13) { //enter
            $(this).trigger("blur");
        }
    })

    $("#opcionTemporizadorSegundos").on("input", function(){
        const inputValue = $(this).val();
        const numericValue = inputValue.replace(/\D/g, ''); 
        const sanitizedValue = Math.min(60, Math.max(0, numericValue)); 
      
        if (inputValue !== sanitizedValue.toString()) {
          $(this).val(sanitizedValue);
        }
        $("#segundosTemporizador").text(`${sanitizedValue} segundos`);
    }).on("focusout", function(){
        if($(this).val() == 0) {
            $(this).val('1')
        }
    });

    $("#opcionesHotCaptura").on("click", function(){
        $("#opcionesHotCaptura").val("");
        detectorHotkey($("#opcionesHotCaptura"))
    });

    $("#opcionesHotTemporizador").on("click", function(){
        $("#opcionesHotTemporizador").val("");
        detectorHotkey($("#opcionesHotTemporizador"))
    });

    $("#opcionesHotExportar").on("click", function(){
        $("#opcionesHotExportar").val("");
        detectorHotkey($("#opcionesHotExportar"))
    });
    
    $("#cerrarOpciones").on("click", function(){
        $(".modalOpciones").css('display', "none");
        lectorHotkeysNuevos()

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

function cargarOpciones(data){
    $("#opcionGuardadoAutomatico").prop('checked', data.opcionGuardadoAutomatico);
    $("#opcionTemporizadorSegundos").val(data.opcionTemporizadorSegundos);
    $("#segundosTemporizador").text(`${data.opcionTemporizadorSegundos} segundos`);
    $(`#opcionFormatoImagen option[value=${data.opcionFormatoImagen}]`).attr('selected', 'selected');
    //hotkeys
    $(".keyboardBoton span").text(data.hotkeys.opcionesHotCaptura.map(([elemento, _]) => elemento).join(" + "));
    $("#opcionesHotCaptura").val(data.hotkeys.opcionesHotCaptura.map(([elemento, _]) => elemento).join(" + "));
    $("#opcionesHotTemporizador").val(data.hotkeys.opcionesHotTemporizador.map(([elemento, _]) => elemento).join(" + "));
    $("#opcionesHotExportar").val(data.hotkeys.opcionesHotExportar.map(([elemento, _]) => elemento).join(" + "));
}

function detectorHotkey($input){
    $input.on("keydown", function(e){
        e.preventDefault()
        
        if(anterior != e.key.toUpperCase()){
            if(teclas.length < 3) {
                if (e.keyCode != 32) {
                    teclas.push([e.key.toUpperCase(), e.keyCode])
                } else {
                    teclas.push(['SPACE', e.keyCode])
                }
                const teclasPrimerElemento = teclas.map(([elemento, _]) => elemento);
                $input.val(teclasPrimerElemento.join(" + "));
                let nuevoHotkey = [];
                nuevoHotkey.push(teclas)
                data.hotkeys[$input.attr('id')] = nuevoHotkey;
            } 
        }
        anterior = e.key.toUpperCase();
    });
    $input.on("keyup", function(e){
        teclas = [];
    });
}

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

    const formData = new FormData();

    let contadorImagenes = 0;
    $(".captura").each(function(){
        let archivo = dataURLtoFile($(this).children().attr("src"), $(this).children().data("nombre_archivo") + ".png", 'image/png');
        formData.append('images', archivo);
        contadorImagenes += 1;
    });

    formData.append('cantidad_imagenes', contadorImagenes);
    //formData.append('opciones');
    for (const value of formData.values()) {
        console.log(value);
    }

    $.ajax({
        type: "POST",
        url: "/aplicacion/guardar", // La URL donde deseas enviar el archivo
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            if (response.Exito) {
                ejecutarEmergente('Proyecto guardado', response.msg, '<i class="fa-regular fa-floppy-disk" style="color: #16161a;"></i>');
            } else {
                ejecutarEmergente('Ocurrió un error al guardar', response.msg, '<i class="fa-regular fa-floppy-disk" style="color: #16161a;"></i>');
            }
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