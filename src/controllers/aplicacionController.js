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
    req.session.nombre_proyecto = "123";
    req.session.id_proyecto = 54

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
    let msg;
    if(req.session.tipo_proyecto == "imagen") {
        upload.array('images', req.body.cantidad_imagenes)(req, res, (err) => {
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
                                    if (imagenes.length == 0) {
                                        console.log("Guardar sin imagenes")
                                    } else {
                                        conexion.query('SELECT * FROM imagenes WHERE correo = ?', [req.session.correo], (error, resultadoImagenes) => {
                                            if (error) {
                                                msg = "No se encontró el proyecto.";
                                                console.log(msg);
                                                res.json({ Exito: false, msg: msg });
                                            } else {
                                                let imagenesExistentes = [];
                                                for (let i = 0; i < resultadoImagenes.length; i++){
                                                    imagenesExistentes.push(resultadoImagenes[i].nombre_imagen);
                                                }
                                                conexion.query('INSERT INTO opciones (correo) VALUES (?)', [req.session.correo], (error, resultadoOpciones) => { // Guardar las preferencias aquí
                                                    if (error){
                                                        msg = "Hubo un error guardando la información.";
                                                        console.log(msg);
                                                        res.json({ Exito: false, msg: msg });
                                                    } else {
                                                        let limite;
                                                        if (req.session.tipo_usuario == 'VIP') {
                                                            limite = 20;
                                                        } else if (req.session.tipo_usuario == 'GRATIS'){
                                                            limite = 10;
                                                        }
                                                        let msg;
                                                        for (let i = 0; i < imagenes.length; i++) {
                                                            if(!imagenesExistentes.includes(imagenes[i].filename)){
                                                                if ((limite - imagenesExistentes.length) <= 0) {
                                                                    console.log("corte")
                                                                    msg = 'El proyecto ha sido guardado satisfactoriamente, sin embargo usted posee una membresía "' + req.session.tipo_usuario + '", la cual tiene un limite de ' + limite + ' imagenes en nuestra base de datos.<br>Es por eso que solo se han guardado ' + i + ' imagenes.';
                                                                    break;
                                                                } else {
                                                                    limite--;
                                                                    conexion.query('INSERT INTO imagenes (correo, nombre_imagen) VALUES(?, ?)', [req.session.correo, imagenes[i].filename], (error, resultadoInsert) => {
                                                                        if (error) {
                                                                            msg = "Error al subir un archivo a la base de datos.";
                                                                            console.log(msg);
                                                                            res.json({ Exito: false, msg: msg });
                                                                        } 
                                                                    });
                                                                } 
                                                            } else {
                                                                msg = "El proyecto ha sido guardado satisfactoriamente."
                                                            }
                                                        }
                                                        res.json({ Exito: true, msg: msg }); // No hay mensaje 
                                                    }
                                                })
                                            }
                                        });
                                        
                                        
                                    }
                                    // Si no se encuentra el proyecto entonces debe , añadir todas las imagenes a imagenes, 
                                    // insert into opciones, momentaneamente se generará una id opciones sin información, esa misma debe ir en data_proyecto_imagen
                                    // luego agrear instancias en data_proyecto_imagen
                                    // por cantidad de imagenes, si hay 10 imagenes se hacen 10 insert into, con su correspondiente id de imagen e id_opciones
                                    //
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