$(document).ready(function(){
    console.log("hola");
    cargarModal();
    animacionVentana();
});

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

    $("body").append(modalGlobal)
}