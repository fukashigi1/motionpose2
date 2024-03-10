import {connection} from '../server.js'

export class proyectosModulo {
    static obtenerProyectos = async ({req}) => {
        let msg;
        if (req.session.correo === undefined) {
            msg = "No se encuentra el correo en nuestra base de datos.";
            console.error(msg);
            return { Exito: false, msg: msg };
        } else {
            try {
                const [filas] = await connection.query('SELECT * FROM proyecto WHERE id_usuario = ?', [req.session.id_usuario])
                console.log("correo");
                console.log(req.session.id_usuario);
                
                console.log("select");
                return{ Exito: true, msg: "Proyectos obtenidos satisfactoriamente.", proyectos: filas };

            } catch (e) {
                msg = 'Ocurrió un error interno.';
                console.error(e);
                return{ Exito: false, msg: msg };
            }
            
        }
    }

    static cambiarNombre = async ({req}) => {
        let msg;

        if (req.body.id == '' || req.body.id === undefined) {
            msg = "El id del proyecto se encuentra incorrecto.";
            console.error(msg);
            return{ Exito: false, msg: msg };
    
        } else {
            if (req.body.nombre == '' || req.body.nombre === undefined) {
                msg = "El nombre del proyecto no puede estár vacío.";
                console.error(msg);
                return{ Exito: false, msg: msg };
    
            } else if (req.body.nombre.length > 30) {
                msg = "El nombre del proyecto puede tener como máximo 30 carácteres.";
                console.error(msg);
                return{ Exito: false, msg: msg };
    
            } else {
                if (req.session.id_usuario === undefined) {
                    msg = "Usted debe tener una sesión activa.";
                    console.error(msg);
                    return{ Exito: false, msg: msg };
                } else {

                    try {
                        const [resultado] = await connection.query("UPDATE proyecto SET nombre = ? WHERE id_usuario = ? AND id_proyecto = ?", [req.body.nombre, req.session.id_usuario, req.body.id])

                        console.log(resultado);
                        if (resultado.changedRows == 0) {
                            msg = "No se ha hecho ningún cambio.";
                            console.error(msg);
                            return{ Exito: false, msg: msg };
                        } else {
                            return{ Exito: true, msg: "El nombre del proyecto fue cambiado satisfactoriamente." };
                        }
                    } catch (e) {
                        msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                        console.error(msg);
                        return{ Exito: false, msg: msg };
                    }
                    
                }
            }
        }
    }

    static eliminarProyecto = async ({req}) => {
        let msg;
        if (req.body.id == '' || req.body.id === undefined) {
            msg = "El id del proyecto se encuentra incorrecto.";
            console.error(msg);
            return{ Exito: false, msg: msg };
    
        } else {
            if (req.session.id_usuario === undefined) {
                msg = "Usted debe tener una sesión activa.";
                console.error(msg);
                return{ Exito: false, msg: msg };
            } else {
                try {
                    const [result] = await connection.query("DELETE FROM imagenes WHERE id_proyecto = ?", [req.body.id])
                    const [results] = await connection.query("DELETE FROM preferencias WHERE id_proyecto = ?", [req.body.id])
                    
                    const query = "DELETE FROM proyecto WHERE id_usuario = ? AND id_proyecto = ?";
                    const values = [req.session.id_usuario, parseInt(req.body.id)];

                    const [resultado] = await connection.query(query, values)

                    console.log(resultado);

                    if (resultado.affectedRows == 0) {
                        msg = "No se ha encontrado el proyecto.";
                        console.error(msg);
                        return{ Exito: false, msg: msg };
                    } else {
                        return{ Exito: true, msg: "El proyecto fue eliminado satisfactoriamente." };
                    }
                    
                } catch (e) {
                    msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                    console.error(msg);
                    return{ Exito: false, msg: msg };
                }
            }
        }//
    }

    static continuar = async ({req}) => {
        let msg;
        if (req.body.id == 0 || req.body.id == null || req.body.id == undefined) {
            msg = "El id es inválido";
            console.log(msg);
            return{ Exito: false, msg: msg };
        } else {
            if (req.session.id_usuario === undefined) {
                msg = "Usted debe tener una sesión activa.";
                console.log(msg);
                return{ Exito: false, msg: msg };
            } else {
                try {
                    const [respuesta] = await connection.query('SELECT * FROM proyecto WHERE id_proyecto = ? AND id_usuario = ?', [req.body.id, req.session.id_usuario])

                    if (respuesta.length == 0) {
                        msg = "Error en la consulta a la base de datos.";
                        console.log(msg);
                        return{ Exito: false, msg: msg };
                    } else {
                        let nombre_proyecto = respuesta[0].nombre;
                        let tipo_proyecto = respuesta[0].id_tipo;
                        let id_proyecto = respuesta[0].id_proyecto;
                        return{ Exito: true, msg: "Proyecto encontrado.", tipo: respuesta[0].id_tipo, datos: {nombre_proyecto, tipo_proyecto, id_proyecto}};
                    }
                } catch (e) {
                    msg = "Error en la consulta a la base de datos.";
                    console.log(msg);
                    return { Exito: false, msg: msg };
                }

                
            }
        }
    }
}