const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
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
    req.session.loggedin = true;
    req.session.nombre_usuario = "test@gmail.com";
    req.session.correo = "test@gmail.com";
    req.session.contrasena = "Mojon333!.";
    req.session.tipo_usuario = "GRATIS";
};
module.exports = controller;
