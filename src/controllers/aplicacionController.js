const controller = {};
const path = require('path');
const multer = require('multer');

controller.view = async (req, res)=>{
    req.session.loggedin = true;
    req.session.nombre_usuario = "test@gmail.com";
    req.session.correo = "test@test.test";
    req.session.contrasena = "Mojon333!.";
    req.session.tipo_usuario = "VIP";
    req.session.tipo_proyecto = "imagen";
    req.session.nombre_proyecto = "asd";
    req.session.id_proyecto = "52"

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
        res.json({Exito: true, nombre_proyecto: req.session.nombre_proyecto, tipo_proyecto: req.session.tipo_proyecto, id_proyecto: req.session.id_proyecto});
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Imagenes');
    },
    filename: (req, file, cb) => {
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

controller.guardar = async (req, res) => {
    if(req.session.tipo_proyecto == "imagen") {
        const cantidad_imagenes = req.body.cantidad_imagenes;

        upload.array('images', cantidad_imagenes)(req, res, (err) => {
            const imagenes = req.files;
            if (err) {
                if (err instanceof multer.MulterError) {
                    res.json({ Exito: false, msg: err.message });
                } else {
                    res.json({ Exito: false, msg: 'Error en la carga de archivos.' });
                }
                return;
            } else {
                req.getConnection((error, conexion) => {
                    if (error) {
                        msg = "Ocurrió un error inesperado en la conexión.";
                        console.log(msg);
                        res.json({ Exito: false, msg: msg });
                    } else {
                        conexion.query('SELECT * FROM proyectos WHERE id_proyecto = ? AND correo = ?', [req.session.id_proyecto, req.session.correo], (error, proyectos) => {
                            if (error) {
                                msg = "No se encontró el proyecto.";
                                console.log(msg);
                                res.json({ Exito: false, msg: msg });
                            } else {
                                if (proyectos.length == 0) {
                                    msg = "No se encontró el proyecto.";
                                    console.log(msg);
                                    res.json({ Exito: false, msg: msg });
                                } else {
                                    conexion.query('SELECT * FROM data_proyecto_imagen WHERE id_proyecto = ?', [req.session.id_proyecto], (error, data_proyecto_imagen) => {
                                        if (data_proyecto_imagen.length != 0) {
                                            // se encontró que existe un save y comparara las imagenes, si ya existen solo agregará las que no están.
                                        } else {
                                            // Si no se encuentra el proyecto entonces debe , añadir todas las imagenes a imagenes, 
                                            // insert into opciones, momentaneamente se generará una id opciones sin información, esa misma debe ir en data_proyecto_imagen
                                            // luego agrear instancias en data_proyecto_imagen
                                            // por cantidad de imagenes, si hay 10 imagenes se hacen 10 insert into, con su correspondiente id de imagen e id_opciones
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    } else if (req.session.tipo_proyecto == "video"){

    } else if (req.session.tipo_proyecto == "3d"){

    } else if (req.session.tipo_proyecto == "animacion"){

    }
};
module.exports = controller;