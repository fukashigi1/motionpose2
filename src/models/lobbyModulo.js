import {connection} from '../server.js'

export class lobbyModulo {
    static crear = async ({req}) => {
        let msg;

        if (req.body.nombre_proyecto == '' || req.body.nombre_proyecto === undefined) {
            msg = "El nombre del proyecto no puede estár vacío.";
            console.error(msg);
            return{ Exito: false, msg: msg };
    
        } else if (req.body.nombre_proyecto.length > 30) {
            msg = "El nombre del proyecto puede tener como máximo 30 carácteres.";
            console.error(msg);
            return{ Exito: false, msg: msg };
    
        } else if (req.body.tipo_proyecto == '' || req.body.tipo_proyecto === undefined || (req.body.tipo_proyecto < 1 && req.body.tipo_proyecto > 4)) {
            msg = "Debes seleccionar una opción válida.";
            console.error(msg);
            return{ Exito: false, msg: msg };
    
        } else {
           
            if (req.session.correo === undefined) {
                msg = "Usted debe tener una sesión activa.";
                console.error(msg);
                return{ Exito: false, msg: msg };
            } else {
                console.log(req.session)
                if (req.session.id_tipo == "1") {
                    try {
                        const [filas] = await connection.query('SELECT COUNT(*) FROM proyecto WHERE id_usuario = ?', [req.session.id_usuario])

                        if (Object.values(filas[0])[0] < 2) {
                            
                            const [respuesta] = await connection.query('INSERT INTO proyecto (nombre, id_tipo, id_usuario) VALUES (?, ?, ?)', [req.body.nombre_proyecto, req.body.tipo_proyecto, req.session.id_usuario])

                            if (respuesta.affectedRows == 0) {
                                msg = "Ocurrió un error inesperado en la consulta."
                                console.error(msg);
                                return{ Exito: false, msg: msg };
                            } else {
                                const [response] = await connection.query('INSERT INTO preferencias (id_proyecto) VALUES (?)', [respuesta.insertId])
                                
                                if (response.affectedRows == 0) {
                                    msg = "Ocurrió un error inesperado en la consulta."
                                    console.error(msg);
                                    return{ Exito: false, msg: msg };
                                } else {
                                    console.log(response);
                                    return{ Exito: true, msg: "Proyecto creado satisfactoriamente." };
                                }
                            }
                        } else {
                            msg = "Un usuario gratuito solo puede tener 2 proyectos simultáneos.";
                            console.error(msg);
                            return{ Exito: false, msg: msg };
                        }
                    } catch (e) {
                        msg = e;
                        console.error(msg);
                        return{ Exito: false, msg: msg };
                    }

                } else {

                    try {
                        const [filas] = await connection.query('SELECT COUNT(*) FROM proyecto WHERE id_usuario = ?', [req.session.id_usuario])
                        
                        if (Object.values(filas[0])[0] < 10) {
                            const [respuesta] = await connection.query('INSERT INTO proyecto (nombre, id_tipo, id_usuario) VALUES (?, ?, ?)', [req.body.nombre_proyecto, req.body.tipo_proyecto, req.session.id_usuario])

                            if (respuesta.affectedRows == 0) {
                                msg = "Ocurrió un error inesperado en la consulta."
                                console.error(msg);
                                return{ Exito: false, msg: msg };
                            } else {
                                const [response] = connection.query('INSERT INTO preferencias (id_proyecto) VALUES (?)', [respuesta.insertId])

                                if (response.affectedRows == 0) {
                                    msg = "Ocurrió un error inesperado en la consulta."
                                    console.error(msg);
                                    return{ Exito: false, msg: msg };
                                } else {
                                    console.log(response);
                                    return{ Exito: true, msg: "Proyecto creado satisfactoriamente." };
                                }
                                
                            }
                        } else {
                            msg = "Un usuario VIP solo puede tener 10 proyectos simultáneos.";
                            console.error(msg);
                            return{ Exito: false, msg: msg };
                        }
                    } catch(e) {
                        msg = e;
                        console.error(msg);
                        return{ Exito: false, msg: msg };
                    }
                    
                }
            }
        }
    }
}