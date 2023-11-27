const controller = {};
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util')

controller.view = async (req, res) => {

    if (req.session.loggedin != true) {
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    } else {
        if (req.session.tipo_proyecto !== undefined) {
            if (req.session.tipo_proyecto == '1') {
                res.sendFile(path.join(__dirname, '..', 'view', 'imagen.html'));
            } else if (req.session.tipo_proyecto == '2') {
                res.sendFile(path.join(__dirname, '..', 'view', 'video.html'));
            } else if (req.session.tipo_proyecto == '3') {
                res.sendFile(path.join(__dirname, '..', 'view', '3d.html'));
            } else if (req.session.tipo_proyecto == '4') {
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
    if (req.session.tipo_proyecto == "1") {

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
                                                            opcionesHotCaptura: resultadoSelectOpciones[0].hotkey_captura,
                                                            opcionesHotTemporizador: resultadoSelectOpciones[0].hotkey_captura_temp,
                                                            opcionesHotExportar: resultadoSelectOpciones[0].hotkey_exportar
                                                        }
                                                    };
                                                    if (error) {
                                                        msg = "Hubo un error obteniendo la información.";
                                                        console.log(msg);
                                                        res.json({ Exito: false, msg: msg });
                                                    } else {
                                                        let query;
                                                        let listaSQL;
                                                        //preferencias
                                                        let opcionGuardadoAutomatico = req.body.opcionGuardadoAutomatico;
                                                        let opcionTemporizadorSegundos = req.body.opcionTemporizadorSegundos;
                                                        let opcionFormatoImagen = req.body.opcionFormatoImagen;
                                                        let opcionesHotCaptura = agregarCorchetes(req.body.opcionesHotCaptura.split(','));
                                                        let opcionesHotTemporizador = agregarCorchetes(req.body.opcionesHotTemporizador.split(','));
                                                        let opcionesHotExportar = agregarCorchetes(req.body.opcionesHotExportar.split(','));

                                                        //Convertir la data
                                                        opcionGuardadoAutomatico = (opcionGuardadoAutomatico == true) ? 1 : 0;

                                                        function agregarCorchetes(hotkeyConvertir){
                                                            let lista = '[';
                                                            for (let i = 0; i < hotkeyConvertir.length; i++) {
                                                                if (i%2 == 0) {
                                                                    lista += `["${hotkeyConvertir[i]}", ${hotkeyConvertir[i + 1]}]`;
                                                                    if(i + 2 < hotkeyConvertir.length) {
                                                                        lista += ','
                                                                    }
                                                                }
                                                            }
                                                            return lista + "]";
                                                        }

                                                        if (resultadoSelectOpciones.length < 1) {
                                                            query = 'INSERT INTO preferencias (id_proyecto, autoguardado, temporizador, formato_imagen, hotkey_captura, hotkey_captura_temp, hotkey_exportar) VALUES (?, ?, ?, ?, ?, ?, ?)';
                                                            listaSQL = [req.session.id_proyecto, opcionGuardadoAutomatico, opcionTemporizadorSegundos, opcionFormatoImagen, opcionesHotCaptura, opcionesHotTemporizador, opcionesHotExportar]
                                                        } else {
                                                            query = "UPDATE preferencias SET id_proyecto = ?, autoguardado = ?, temporizador = ?, formato_imagen = ?, hotkey_captura = ? , hotkey_captura_temp = ?, hotkey_exportar = ? WHERE id_proyecto = ?";
                                                            listaSQL = [req.session.id_proyecto, opcionGuardadoAutomatico, opcionTemporizadorSegundos, opcionFormatoImagen, opcionesHotCaptura, opcionesHotTemporizador, opcionesHotExportar, req.session.id_proyecto]
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
    } else if (req.session.tipo_proyecto == "2") {

    } else if (req.session.tipo_proyecto == "3") {

    } else if (req.session.tipo_proyecto == "4") {

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
                        conexion.query('SELECT * FROM preferencias WHERE id_proyecto = ?', [req.session.id_proyecto], (error, preferencias) => {
                            if (error) {
                                msg = "No se encontraron preferencias.";
                                console.log(msg);
                                res.json({ Exito: false, msg: msg });
                            } else {
                                let autoguardado = (preferencias[0].autoguardado == 0) ? false : true;
                                let preferenciasFormateado = {
                                    opcionGuardadoAutomatico: autoguardado,
                                    opcionTemporizadorSegundos: preferencias[0].temporizador,
                                    opcionFormatoImagen: preferencias[0].formato_imagen,
                                    hotkeys: {
                                        opcionesHotCaptura: preferencias[0].hotkey_captura,
                                        opcionesHotTemporizador: preferencias[0].hotkey_captura_temp,
                                        opcionesHotExportar: preferencias[0].hotkey_exportar
                                    }
                                };
                                msg = "Las imágenes se han cargado correctamente."
                                res.json({ Exito: true, msg: msg, imagenes: imagenesBase64, nombre_proyecto: req.session.nombre_proyecto, preferencias: preferenciasFormateado});
                            }
                        });
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