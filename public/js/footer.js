$(document).ready(function(){
    let footer = '';
    footer += '<footer>';
    footer += '    <p>Motion Pose MP ~ 2023</p>';
    footer += '    <a id="politicas">Políticas de privacidad</a>';
    footer += '    <a id="terminos">Términos y condiciones</a>';
    footer += '    <a id="manual">Manual de usuario</a>';
    footer += '    <a id="volverArriba" style="float: right;">Volver arriba</a>';
    footer += '</footer>';
    
    $('body').append(footer);

    $('footer').css({
        'margin-left': '11vw',
        'margin-right': '11vw',
        'margin-top': '26vh',
        'border-top': '1px solid white',
        'margin-bottom': '7vh'
    });

    $('footer p').css({
        'font-size': '1.47vw',
        'margin-left': '1.85vw'
    });

    $('footer a').css({
        'font-size': '1.45vw',
        'margin-left': '1.80vw',
        'cursor': 'pointer'
    });

    $('footer a').hover(function() {
        $(this).css('text-decoration', 'underline');
    }, function() {
        $(this).css('text-decoration', 'none');
    });

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
