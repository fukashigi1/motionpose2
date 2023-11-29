$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: '/config',
        dataType: "json",
        contentType: 'application/json',
        success: function(data){
            if (data.autorizado) {
                let v = `${data.nombreProyecto} Version: ${data.versionProyecto}`;
                $('body').append('<div style="background-color: black; position: sticky; font-size: 2vh; color: white; bottom: 0;">' + v + '</div>');
            }
        },
        error: function(error){
            console.error('No fue posible obtener la versión del proyecto.', error);
        }
    });

    let nav = '';
    nav += '    <div class="header">';
    nav += '        <img src="img/motion_pose_background4.png" class="imgLogo">';
    nav += '        <div></div>';
    nav += '        <i class="fa-solid fa-bars dropdown-menu"></i>';
    nav += '        <ul class="ulNav">';
    nav += '            <a class="navMenu2" id="inicio">Inicio</a>';
    nav += '            <a class="navMenu2" id="misProyectos">Mis proyectos</a>';
    nav += '            <a class="navMenu2" id="miCuenta">Mi cuenta</a>';
    nav += '            <a class="navMenu2" id="tienda">Tienda</a>';
    nav += '            <a class="navMenu2" id="ayuda">Ayuda</a>';
    nav += '            <a class="navMenu2" id="cerrarSesion">Cerrar sesión</a>';
    nav += '        </ul>';
    nav += '    </div>';

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
    

    $('body').prepend(nav);
    $('body').append(modal);
    $('body').append(modalGlobal);
    function navMenuToggle() {
        if ($(window).width() <= 1080 && $(window).height() <= 2400) {
            $(".ulNav").hide();
            $(".ulNav").slideUp();
        }else{
            $(".ulNav").show();
        }
    }
    navMenuToggle();

    $(window).resize(function() {
        navMenuToggle();
    });
    $('.dropdown-menu').on('click', function(){
        $(".ulNav").slideToggle(300);
        $(".header").toggleClass('header-top');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.dropdown-menu').length && $(window).width() <= 1080 && $(window).height() <= 2400) {
            $(".ulNav").slideUp(300);
            $(".header").removeClass('header-top');
        }
    });

    if (window.location.href.includes('lobby')) {
        $("#inicio").css('background-color', '#003f4e');
        $("#inicio").css('color', '#0091b6'); 
    }
    if (window.location.href.includes('proyecto')) {
        $("#misProyectos").css('background-color', '#003f4e');
        $("#misProyectos").css('color', '#0091b6'); 
    }
    if (window.location.href.includes('miCuenta')) {
        $("#miCuenta").css('background-color', '#003f4e');
        $("#miCuenta").css('color', '#0091b6'); 
    }
    if (window.location.href.includes('tienda')) {
        $("#tienda").css('background-color', '#003f4e');
        $("#tienda").css('color', '#0091b6'); 
    }
    if (window.location.href.includes('ayuda')) {
        $("#ayuda").css('background-color', '#003f4e');
        $("#ayuda").css('color', '#0091b6'); 
    }


    $('html, body').animate({scrollTop:0}, '1');

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

    

    // Acción modal
    $("body").on("click", "#cerrarVentana, #cancelarModal", function(){
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
    })

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