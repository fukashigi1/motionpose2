const controller = {};
const path = require('path');
const multer = require('multer');
const fs = require('fs');

controller.view = async (req, res) => {
    req.session.loggedin = true;
    req.session.id_usuario = 1;
    req.session.nombre_usuario = "test";
    req.session.correo = "test@test.test";
    req.session.contrasena = "Tester_123";
    req.session.id_tipo = 2;
    req.session.tipo_proyecto = "imagen";
    req.session.nombre_proyecto = "sexo";
    req.session.id_proyecto = 1;

    if (req.session.loggedin != true) {
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    } else {
        if (req.session.tipo_proyecto !== undefined) {
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
        res.json({ Exito: false, msg: "Hubo un error obteniendo la información del proyecto." });
    } else {
        res.json({ Exito: true, nombre_proyecto: req.session.nombre_proyecto, tipo_proyecto: req.session.tipo_proyecto, id_proyecto: req.session.id_proyecto });
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

var hola;
controller.guardar = async (req, res) => {
    let msg;
    if (req.session.tipo_proyecto == "imagen") {

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
                        conexion.query('SELECT * FROM proyecto WHERE id_proyecto = ? AND id_usuario = ?', [req.session.id_proyecto, req.session.id_usuario], (error, proyectos) => {
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
                                        /*conexion.query('SELECT * FROM data_proyecto_imagen WHERE id_proyecto = ?', [req.session.id_proyecto], (error, resultadoProyecto) => {
                                            if (error) {
                                                msg = error;
                                                console.log(msg);
                                                res.json({ Exito: false, msg: msg });
                                            } else {
                                                if (resultadoProyecto.length > 1) {
                                                    // SI EXSITE UN SAVE
                                                } else {
                                                    // SI NO EXISTE UN SAVE - AGREGAR COLUMNA ID PROYECTO A MIAMGENS NDSAKJN
                                                }
                                            }
                                        })*/
                                        conexion.query('SELECT * FROM imagenes WHERE id_proyecto = ?', [req.session.id_proyecto], (error, resultadoImagenes) => {
                                            if (error) {
                                                msg = "No se encontró el proyecto.";
                                                console.log(msg);
                                                res.json({ Exito: false, msg: msg });
                                            } else {
                                                hola = resultadoImagenes;
                                                let imagenesExistentes = [];
                                                for (let i = 0; i < resultadoImagenes.length; i++) {
                                                    imagenesExistentes.push(resultadoImagenes[i].nombre_imagen);
                                                }
                                                conexion.query('SELECT * FROM preferencias WHERE id_proyecto = ?', [req.session.id_proyecto], (error, resultadoSelectOpciones) => {
                                                    /*UPDATE preferencias SET hotkey_captura = '[["SHIFT", 16], ["D", 68]]' WHERE id_preferencias = 1;*/
                                                    let preferencias = {
                                                        opcionGuardadoAutomatico: resultadoSelectOpciones[0].autoguardado,
                                                        opcionTemporizadorSegundos: resultadoSelectOpciones[0].temporizador,
                                                        opcionFormatoImagen: resultadoSelectOpciones[0].formato_imagen,
                                                        hotkeys: {
                                                            opcionesHotCaptura: JSON.parse(resultadoSelectOpciones[0].hotkey_captura),
                                                            opcionesHotTemporizador: JSON.parse(resultadoSelectOpciones[0].hotkey_captura_temp),
                                                            opcionesHotExportar: JSON.parse(resultadoSelectOpciones[0].hotkey_exportar)
                                                        }
                                                    };
                                                    console.log(preferencias);
                                                    if (error) {
                                                        msg = "Hubo un error obteniendo la información.";
                                                        console.log(msg);
                                                        res.json({ Exito: false, msg: msg });
                                                    } else {
                                                        let query;
                                                        let listaSQL;
                                                        if (resultadoSelectOpciones.length < 1) {
                                                            query = 'INSERT INTO preferencias (id_proyecto) VALUES (?)';
                                                            listaSQL = [req.session.id_proyecto]
                                                        } else {
                                                            query = 'UPDATE preferencias SET id_proyecto = ? WHERE id_proyecto = ?';
                                                            listaSQL = [req.session.id_proyecto, req.session.id_proyecto]
                                                        }
                                                        conexion.query(query, listaSQL, (error, resultadoOpciones) => { // Guardar las preferencias aquí
                                                            if (error) {
                                                                msg = "Hubo un error guardando la información.";
                                                                console.log(error);
                                                                res.json({ Exito: false, msg: msg });
                                                            } else {
                                                                let limite;
                                                                if (req.session.id_tipo == 2 || req.session.id_tipo == 3) {
                                                                    limite = 20;

                                                                } else if (req.session.id_tipo == 1) {
                                                                    limite = 10;
                                                                }
                                                                let msg;
                                                                for (let i = 0; i < imagenes.length; i++) {
                                                                    if (!imagenesExistentes.includes(imagenes[i].originalname)) {
                                                                        if ((limite - imagenesExistentes.length) <= 0) {
                                                                            //msg = 'El proyecto ha sido guardado satisfactoriamente, sin embargo usted posee una membresía "' + req.session.tipo_usuario + '", la cual tiene un limite de ' + limite + ' imagenes en nuestra base de datos.<br>Es por eso que solo se han guardado ' + i + ' imagenes.';

                                                                            msg = 'El proyecto ha sido guardado satisfactoriamente';
                                                                            break;
                                                                        } else {
                                                                            limite--;
                                                                            var a;
                                                                            conexion.query('INSERT INTO imagenes (id_proyecto, nombre) VALUES(?, ?)', [req.session.id_proyecto, imagenes[i].originalname], (error, resultadoInsert) => {
                                                                                if (error) {
                                                                                    msg = "Error al subir un archivo a la base de datos.";
                                                                                    console.log(msg);
                                                                                    res.json({ Exito: false, msg: msg });
                                                                                } else {
                                                                                    a = resultadoInsert;
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                                msg = "El proyecto ha sido guardado satisfactoriamente."
                                                                res.json({ Exito: true, msg: msg, preferencias: preferencias }); // No hay mensaje 
                                                            }
                                                        })
                                                    }
                                                });
                                            }
                                        });
                                        console.log(hola)

                                    }
                                    // Si no se encuentra el proyecto entonces debe , añadir todas las imagenes a imagenes, 
                                    // insert into preferencias, momentaneamente se generará una id preferencias sin información, esa misma debe ir en data_proyecto_imagen
                                    // luego agrear instancias en data_proyecto_imagen
                                    // por cantidad de imagenes, si hay 10 imagenes se hacen 10 insert into, con su correspondiente id de imagen e id_preferencias
                                    //
                                }
                            }
                        });
                    }
                });
            }
        });
    } else if (req.session.tipo_proyecto == "video") {

    } else if (req.session.tipo_proyecto == "3d") {

    } else if (req.session.tipo_proyecto == "animacion") {

    }
};
controller.cargar = async (req, res) => {
    if (req.session.nombre_proyecto == '' || req.session.nombre_proyecto === undefined) {
        res.json({ Exito: false, msg: "Hubo un error obteniendo la información del proyecto." });
    } else {
        req.getConnection((error, conexion) => {
            if (error) {
                msg = "Ocurrió un error inesperado en la conexión.";
                console.log(msg);
                res.json({ Exito: false, msg: msg });
            } else {
                conexion.query('SELECT * FROM imagenes WHERE id_proyecto = ?', [req.session.id_proyecto], (error, imagenes) => {
                    if (error) {
                        msg = "No se encontraron imágenes.";
                        console.log(msg);
                        res.json({ Exito: false, msg: msg });
                    } else {
                            const imagenesBase64 = imagenes.map(imagen => {
                            const filePath = path.join(__dirname, '..', '..', 'imagenes', imagen.nombre);
                            const base64 = getBase64(filePath);
                            return { ...imagen, base64 };
                        });
                
                        msg = "Las imágenes se han cargado correctamente."
                        res.json({ Exito: true, msg: msg, imagenes: imagenesBase64, nombre_proyecto: req.session.nombre_proyecto });
                    }
                });
            }
        });
    }
};
function getBase64(filePath) {
    try {
        const data = fs.readFileSync(filePath);
        return data.toString('base64');
    } catch (error) {
        console.log('Error al leer el archivo:', error);
        return null;
    }
}
module.exports = controller;    