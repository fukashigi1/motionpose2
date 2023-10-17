$(document).ready(function(){
    let footer = '';
    footer += '<footer>';
    footer += '    <p>';
    footer += '        Motion Pose MP ~ 2023';
    footer += '    </p>';
    footer += '    <a>Políticas de privacidad</a>';
    footer += '    <a>Términos y condiciones</a>';
    footer += '    <a>Manual de usuario</a>';
    footer += '    <a id="volverArriba" style="float: right;">Volver arriba</a>';
    footer += '</footer>';
    
    $('body').append(footer);

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
});