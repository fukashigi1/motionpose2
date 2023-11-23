$(document).ready(function(){
    function navMenuToggle() {
        if ($(window).width() <= 1080 && $(window).height() <= 2400) {
            $(".navMenu").hide();
            $(".navMenu").slideUp();
        }else{
            $(".navMenu").show();
        }
    }
    navMenuToggle();

    $(window).resize(function() {
        navMenuToggle();
    });

    let footer = '';
    footer += '<footer>';
    footer += '    <p>Motion Pose MP ~ 2023</p>';
    footer += '    <div class="footerButtons"><a id="politicas">Políticas de privacidad</a>';
    footer += '    <a id="terminos">Términos y condiciones</a>';
    footer += '    <a id="manual">Manual de usuario</a></div>';
    footer += '    <a class="btnSubir" id="volverArriba" style="float: right;"><i class="fa-solid fa-chevron-up"></i></a>';
    footer += '</footer>';
    
    $('body').append(footer);


    if (window.location.href.includes('politicas')) {
        $("#politicas").css('background-color', '#003f4e');
    }

    if (window.location.href.includes('terminos')) {
        $("#terminos").css('background-color', '#003f4e');
    }

    if (window.location.href.includes('manual')) {
        $("#manual").css('background-color', '#003f4e');
    }

    $(window).scroll(function() {
        var distanciaTop = $(window).scrollTop();
        if (distanciaTop >= 20) {
            $(".header").css("background-color", "#16161a");
        } else {
            $(".header").css("background-color", "#ffffff00");
        }
    });

    $('.dropdown-menu').on('click', function(){
        $(".navMenu").slideToggle(300);
        $(".header").toggleClass('header-top');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.dropdown-menu').length && $(window).width() <= 1080 && $(window).height() <= 2400) {
            $(".navMenu").slideUp(300);
            $(".header").removeClass('header-top');
        }
    });

    $('.imgLogo, #volverArriba').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });

    $("#politicas").on("click", function(){
        window.location.href = '/politicas';
    });
    $("#terminos").on("click", function(){
        window.location.href = '/terminos';
    });
    $("#manual").on("click", function(){
        window.location.href = '/manual';
    });
});
