const controller = {};
const path = require('path');
const multer = require('multer');


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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Imagenes');
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname);
    }
});

// Middleware de validación de archivos
const fileValidation = (req, file, cb) => {
    // Realiza la validación aquí
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // Continuar con la carga
        cb(null, true);
    } else {
        // Rechazar la carga
        cb(new Error('Tipo de archivo no admitido'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileValidation });

controller.imagenes = async (req, res) => {
    console.log(req.body);
    upload.array('images', 3)(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                res.json({ Exito: false, msg: err.message });
            } else {
                res.json({ Exito: false, msg: 'Error en la carga de archivos.' });
            }
            return;
        } else {
            res.json({ Exito: true, msg: 'La subida de archivos fue satisfactoria.' });
        }
    });
};
module.exports = controller;
