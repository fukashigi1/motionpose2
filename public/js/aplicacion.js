$(document).ready(function(){
    console.log("hola");
    let modalGlobal = '';
    modalGlobal += '<div class="modal">';
    modalGlobal += '    <div class="modalHeader">';
    modalGlobal += '        <div class="modalTitulo"></div>';
    modalGlobal += '        <i class="fa-solid fa-xmark exit" style="color: #16161a;" id="cerrarVentana"></i>';
    modalGlobal += '    </div>';
    modalGlobal += '    <div class="modalCuerpo"></div>';
    modalGlobal += '    <div class="modalFooter">';
    modalGlobal += '        <button class="modalBoton" id="siguienteModal">Siguiente</button>';
    modalGlobal += '        <button class="modalBoton" id="cancelarModal">Cancelar</button>';
    modalGlobal += '    </div>';
    modalGlobal += '</div>';

    $("body").append(modalGlobal)
});