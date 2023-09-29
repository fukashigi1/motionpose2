$(document).ready(function(){
    let nav = '';
    nav += '<div class="header">';
    nav += '    <img src="img/motion_pose_background4.png" class="imgLogo">';
    nav += '    <ul class="ulNav">';
    nav += '        <a id="inicio">Inicio</a>';
    nav += '        <a id="misProyectos">Mis proyectos</a>';
    nav += '        <a id="miCuenta" >Mi cuenta</a>';
    nav += '        <a id="tienda">Tienda</a>';
    nav += '        <a id="ayuda">Ayuda</a>';
    nav += '        <a id="cerrarSesion">Cerrar sesión</a>';
    nav += '    </ul>';
    nav += '</div>';

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

    let modalGlobal = '';
    modalGlobal += '<div class="modalCrearProyecto">';
    modalGlobal += '    <div class="modalCrearProyectoHeader">';
    modalGlobal += '        <div class="modalCrearProyectoTitulo"></div>';
    modalGlobal += '        <i class="fa-solid fa-xmark exit" style="color: #16161a;" id="cerrarVentana"></i>';
    modalGlobal += '    </div>';
    modalGlobal += '    <div class="modalCrearProyectoCuerpo"></div>';
    modalGlobal += '    <div class="modalCrearProyectoFooter">';
    modalGlobal += '        <button class="modalCrearProyectoBoton" id="siguienteModal">Siguiente</button>';
    modalGlobal += '        <button class="modalCrearProyectoBoton" id="cancelarModal">Cancelar</button>';
    modalGlobal += '    </div>';
    modalGlobal += '</div>';

    $('body').prepend(nav);
    $('body').append(modal);
    $('body').append(modalGlobal);

    $('html, body').animate({scrollTop:0}, '1');

    $(window).scroll(function() {
        var distanciaTop = $(window).scrollTop();
        if (distanciaTop >= 20) {
            $(".header").css("background-color", "#16161a");
        } else {
            $(".header").css("background-color", "#ffffff00");
        }
        });

        $('#volverArriba').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop:0}, '300');
    });

    //Modal
    $(".ejecutarModal").on("click", function(){
        ejecutarModal();
    });

    $(".exit").on("click", function(){
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

    $(".modalBoton").on("click", function(){
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


    // Nav
    $('.imgLogo').on('click', function(e) {
        window.location.href = '/';
      });
    $("#inicio").on("click", function(){
        window.location.href = '/lobby';
    });
    $("#misProyectos").on("click", function(){
        window.location.href = '/proyectos';
    });
    $("#miCuenta").on("click", function(){
        window.location.href = '/cuenta';
    });
    $("#tienda").on("click", function(){
        window.location.href = '/tienda';
    });
    $("#ayuda").on("click", function(){
        window.location.href = '/ayuda';
    });
    $("#cerrarSesion").on("click", function(){
        window.location.href = 'lobby/salir';
    });
});

function ejecutarModal(titulo, descripcion, icono){
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