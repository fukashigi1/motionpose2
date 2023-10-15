const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    req.session.loggedin = true;
    req.session.nombre_usuario = "test@gmail.com";
    req.session.correo = "test@gmail.com";
    req.session.contrasena = "Mojon333!.";
    req.session.tipo_usuario = "VIP";
    req.session.tipo_proyecto = "imagen";
    req.session.nombre_proyecto = "123123123123123";

    if(req.session.loggedin != true){
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    }else{
        if (req.session.tipo_proyecto !== undefined){
            if (req.session.tipo_proyecto == 'imagen') {
                res.sendFile(path.join(__dirname, '..', 'view', 'imagen.html'));
            } else if (req.session.tipo_proyecto == 'video') {
                res.sendFile(path.join(__dirname, '..', 'view', 'video.html'));
            } else if (req.session.tipo_proyecto == '3d') {
                res.sendFile(path.join(__dirname, '..', 'view', '3d.html'));
            } else if (req.session.tipo_proyecto == 'animacion') {
                res.sendFile(path.join(__dirname, '..', 'view', 'animacion.html'));
            }
        } else {
            res.redirect('/proyectos'); //a
        }
    }
    
};

controller.obtenerDatosProyecto = async (req, res) => {
    if (req.session.nombre_proyecto == '' || req.session.nombre_proyecto === undefined) {
        res.json({Exito: false, msg: "Hubo un error obteniendo la información del proyecto."});
    } else {
        res.json({Exito: true, nombre_proyecto: req.session.nombre_proyecto, tipo_proyecto: req.session.tipo_proyecto});
    }
};
module.exports = controller;
