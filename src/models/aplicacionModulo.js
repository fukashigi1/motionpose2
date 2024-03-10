import multer from 'multer'
import {connection} from '../server.js'
import fs from 'fs'

export class aplicacionModulo {
    static obtenerDatosProyecto = async ({req}) => {
        if (req.session.nombre_proyecto == '' || req.session.nombre_proyecto === undefined) {
            return{ Exito: false, msg: "Hubo un error obteniendo la información del proyecto." };
        } else {
            return{ Exito: true, nombre_proyecto: req.session.nombre_proyecto, tipo_proyecto: req.session.tipo_proyecto, id_proyecto: req.session.id_proyecto };
        }
    }

    static guardar = async ({req}) => {
        
        let msg;
        if (req.session.tipo_proyecto == "1") {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'Imagenes');
                },
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                }
            });
            
            const fileValidation = (req, file, cb) => {
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                    cb(null, true);
                } else {
                    cb(new Error('Tipo de archivo no admitido'), false);
                }
            };
            
            const upload = multer({ storage: storage, fileFilter: fileValidation });

            const uploadAsync = async (cantidad_imagenes) => {
                return new Promise((resolve, reject) => {
                    upload.array('images', cantidad_imagenes)(req, res, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(req.files);
                        }
                    });
                });
            };

            const imagenes = await uploadAsync(cantidad_imagenes);
            
            try {
                const [proyectos] = await connection.query('SELECT * FROM proyecto WHERE id_proyecto = ? AND id_usuario = ?', [req.session.id_proyecto, req.session.id_usuario])

                if (proyectos.length == 0) {
                    msg = "No se encontró el proyecto.";
                    console.log(msg);
                    return{ Exito: false, msg: msg };
                } else {
                    if (imagenes.length == 0) {
                        console.log("Guardar sin imagenes")
                    } else {
                        const [resultadoImagenes] = await connection.query('SELECT * FROM proyecto WHERE id_proyecto = ? AND id_usuario = ?', [req.session.id_proyecto])

                        let imagenesExistentes = [];

                        for (let i = 0; i < resultadoImagenes.length; i++) {
                            imagenesExistentes.push(resultadoImagenes[i].nombre);
                        }

                        try {
                            const [resultadoSelectOpciones] = await connection.query('SELECT * FROM preferencias WHERE id_proyecto = ?', [req.session.id_proyecto])
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

                            let query;
                            let listaSQL;
                            //preferencias
                            let opcionGuardadoAutomatico = req.body.opcionGuardadoAutomatico;
                            let opcionTemporizadorSegundos = req.body.opcionTemporizadorSegundos;
                            let opcionFormatoImagen = req.body.opcionFormatoImagen;
                            let opcionesHotCaptura = agregarCorchetes(req.body.opcionesHotCaptura.split(','));
                            let opcionesHotTemporizador = agregarCorchetes(req.body.opcionesHotTemporizador.split(','));
                            let opcionesHotExportar = agregarCorchetes(req.body.opcionesHotExportar.split(','));

                            opcionGuardadoAutomatico = (opcionGuardadoAutomatico == true) ? 1 : 0;

                            function agregarCorchetes(hotkeyConvertir) {
                                let lista = '[';
                                for (let i = 0; i < hotkeyConvertir.length; i++) {
                                    if (i % 2 == 0) {
                                        lista += `["${hotkeyConvertir[i]}", ${hotkeyConvertir[i + 1]}]`;
                                        if (i + 2 < hotkeyConvertir.length) {
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

                            try {
                                const [resultadoOpciones] = await connection.query(query, listaSQL)

                                let limite;
                                if (req.session.id_tipo == 2 || req.session.id_tipo == 3) {
                                    limite = 20;
                                } else if (req.session.id_tipo == 1) {
                                    limite = 10;
                                }

                                for (let i = 0; i < imagenes.length; i++) {
                                    console.log(limite);
                                    console.log("imagen existente: "+ imagenesExistentes[i]);
                                    console.log("imagen nueva:"+ imagenes[i].originalname);
                                    console.log(imagenesExistentes.length);

                                    if (!imagenesExistentes.includes(imagenes[i].originalname)) {
                                        if ((limite - imagenesExistentes.length) <= 0) {
                                            try {
                                                const [resultadoUpdate] = await connection.query('UPDATE imagenes SET nombre = ? WHERE id_proyecto = ? AND nombre = ?', [imagenes[i].originalname, req.session.id_proyecto, imagenesExistentes[i]])

                                                a = resultadoUpdate;

                                            } catch (e) {
                                                msg = "Error al actualizar un archivo en la base de datos.";
                                                console.log(msg);
                                                return{ Exito: false, msg: msg };
                                            }

                                        } else {
                                            limite--;
                                            var a;
                                            try {
                                                const [resultadoInsert] = await connection.query('INSERT INTO imagenes (id_proyecto, nombre) VALUES(?, ?)', [req.session.id_proyecto, imagenes[i].originalname])

                                                a = resultadoInsert;

                                            } catch (e) {
                                                msg = "Error al subir un archivo a la base de datos.";
                                                console.log(msg);
                                                return{ Exito: false, msg: msg };
                                            }
                                        }

                                    } else if((limite - imagenesExistentes.length) <= 0){
                                        try {
                                            const [resultadoUpdate] = await connection.query('UPDATE imagenes SET nombre = ? WHERE id_proyecto = ? AND nombre = ?', [imagenesExistentes[i], req.session.id_proyecto, imagenesExistentes[i]])

                                            a = resultadoUpdate;
                                        } catch (e) {
                                            msg = "Error al actualizar un archivo en la base de datos.";
                                            console.log(msg);
                                            return{ Exito: false, msg: msg };
                                        }
                                    }
                                }
                                try {
                                    const [resultadoImagenesBD] = await connection.query('SELECT * FROM imagenes WHERE id_proyecto = ?', [req.session.id_proyecto])
                                    // Obtener la lista de nombres de imágenes almacenadas en la base de datos
                                    let nombresImagenesBD = resultadoImagenesBD.map(imagen => imagen.nombre);

                                    // Obtener la lista de nombres de imágenes que fueron cargadas en la solicitud
                                    let nombresImagenesCargadas = imagenes.map(imagen => imagen.originalname);

                                    // Identificar las imágenes que están en la base de datos pero no fueron cargadas
                                    let imagenesParaEliminar = nombresImagenesCargadas.filter(nombreImagen => !nombresImagenesBD.includes(nombreImagen));

                                    console.log("-----\nImagen en la base de datos: "+nombresImagenesBD);
                                    console.log("Imagenes cargadas: "+nombresImagenesCargadas+"\n------");
                                    console.log(imagenesParaEliminar);

                                    // Eliminar las imágenes del directorio
                                    imagenesParaEliminar.forEach(nombreImagen => {
                                        const rutaImagen = path.join(__dirname, '..', '..', 'imagenes', nombreImagen);

                                        // Verificar si el archivo existe antes de intentar eliminarlo
                                        if (fs.existsSync(rutaImagen)) {
                                            // Eliminar el archivo
                                            fs.unlinkSync(rutaImagen);

                                            console.log(`Archivo ${nombreImagen} eliminado del directorio.`);
                                        } else {
                                            console.log(`El archivo ${nombreImagen} no existe en el directorio.`);
                                        }
                                    });

                                    msg = "El proyecto ha sido guardado satisfactoriamente."
                                    return{ Exito: true, msg: msg, preferencias: preferencias }; // No hay mensaje 

                                } catch (e) {
                                    msg = "Error al eliminar imagenes.";
                                    console.log(msg);
                                    return{ Exito: false, msg: msg };
                                }

                            } catch (e) {
                                msg = "Hubo un error guardando la información.";
                                console.log(error);
                                return{ Exito: false, msg: msg };
                            }

                        } catch (e) {
                            msg = "Hubo un error obteniendo la información.";
                            console.log(msg);
                            return{ Exito: false, msg: msg };
                        }
                    }
                }

            } catch (e) {
                msg = "No se encontró el proyecto.";
                console.log(msg);
                return{ Exito: false, msg: msg };
            }
            
        } else if (req.session.tipo_proyecto == "2") {
    
        } else if (req.session.tipo_proyecto == "3") {
    
        } else if (req.session.tipo_proyecto == "4") {
    
        }
    }

    static cargar = async ({req}) => {
        
        function getBase64(filePath) {
            try {
                const data = fs.readFileSync(filePath);
                return data.toString('base64');
            } catch (error) {
                console.log('Error al leer el archivo:', error);
                return null;
            }
        }
        let msg;
        if (req.session.nombre_proyecto == '' || req.session.nombre_proyecto === undefined) {
            return{ Exito: false, msg: "Hubo un error obteniendo la información del proyecto." };
        } else {
            try {
                const [imagenes] = await connection.query('SELECT * FROM imagenes WHERE id_proyecto = ?', [req.session.id_proyecto])

                const imagenesBase64 = imagenes.map(imagen => {
                    const filePath = path.join(__dirname, '..', '..', 'imagenes', imagen.nombre);
                    const base64 = getBase64(filePath);
                    return { ...imagen, base64 };
                });

                try {
                    const [preferencias] = await connection.query('SELECT * FROM preferencias WHERE id_proyecto = ?', [req.session.id_proyecto])
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
                    return{ Exito: true, msg: msg, imagenes: imagenesBase64, nombre_proyecto: req.session.nombre_proyecto, preferencias: preferenciasFormateado };
                } catch (e) {
                    msg = "No se encontraron preferencias.";
                    console.log(msg);
                    return{ Exito: false, msg: msg };
                }

            } catch(e) {
                msg = "No se encontraron imágenes.";
                console.log(msg);
                return{ Exito: false, msg: msg };
            }
        }
    }
}