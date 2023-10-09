const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    }
    req.session.loggedin = true;
    req.session.nombre_usuario = "test@gmail.com";
    req.session.correo = "test@gmail.com";
    req.session.contrasena = "Mojon333!.";
    req.session.tipo_usuario = "GRATIS";
};

controller.obtenerProyectos = async (req, res) => {
    let msg;
    req.getConnection((error, conexion) => {
        if (error) {
            msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
            console.error(msg);
            res.json({ Exito: false, msg: msg });
        } else {
            if (req.session.correo === undefined) {
                msg = "No se encuentra el correo en nuestra base de datos.";
                console.error(msg);
                res.json({ Exito: false, msg: msg });
            }else{
                conexion.query('SELECT * FROM proyectos WHERE correo = ?', [req.session.correo], (error, filas) => {
                console.log("correo");
                console.log(req.session.correo);
                if (error) {
                    msg = error.code;
                    console.error(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    console.log("select");
                    res.json({ Exito: true, msg: "Proyectos obtenidos satisfactoriamente.", proyectos: filas});
                }
            });
            }
        }
    });
};

controller.cambiarNombre = async (req, res) => {
    let msg;
    
    if (req.body.id == '' || req.body.id === undefined) {
        msg = "El id del proyecto se encuentra incorrecto.";
        console.error(msg);
        res.json({ Exito: false, msg: msg });

    } else {
        if (req.body.nombre == '' || req.body.nombre === undefined) {
            msg = "El nombre del proyecto no puede estár vacío.";
            console.error(msg);
            res.json({ Exito: false, msg: msg });
    
        } else if (req.body.nombre.length > 30) {
            msg = "El nombre del proyecto puede tener como máximo 30 carácteres.";
            console.error(msg); 
            res.json({ Exito: false, msg: msg });
    
        } else {
            req.getConnection((error, conexion) => {
                if (error) {
                    msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                    console.error(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    if (req.session.correo === undefined) {
                        msg = "Usted debe tener una sesión activa.";
                        console.error(msg);
                        res.json({ Exito: false, msg: msg });
                    } else {
                        conexion.query("UPDATE proyectos SET nombre_proyecto = '" + req.body.nombre + "' WHERE correo = '" + req.session.correo + "' AND id_proyecto = '" + req.body.id + "'", (error, resultado) => {
                            if (error) {
                                msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                                console.error(msg);
                                res.json({ Exito: false, msg: msg });
                            } else {
                                console.log(resultado);
                                if (resultado.changedRows == 0) {
                                    msg = "No se ha hecho ningún cambio.";
                                    console.error(msg);
                                    res.json({ Exito: false, msg: msg });
                                }else {
                                    res.json({ Exito: true, msg: "El nombre del proyecto fue cambiado satisfactoriamente." });
                                }
                            }
                        });
                    }
                }
            });
        }
    }
}

controller.eliminarProyecto = async (req, res) => {
    let msg;
    if (req.body.id == '' || req.body.id === undefined) {
        msg = "El id del proyecto se encuentra incorrecto.";
        console.error(msg);
        res.json({ Exito: false, msg: msg });

    } else {
        req.getConnection((error, conexion) => {
            if (error) {
                msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                console.error(msg);
                res.json({ Exito: false, msg: msg });
            } else {
                if (req.session.correo === undefined) {
                    msg = "Usted debe tener una sesión activa.";
                    console.error(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    conexion.query("DELETE FROM proyectos WHERE correo = '" + req.session.correo + "' AND id_proyecto = '" + req.body.id + "'", (error, resultado) => {
                        if (error) {
                            msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                            console.error(msg);
                            res.json({ Exito: false, msg: msg });
                        } else {
                            console.log(resultado);
                            if (resultado.affectedRows == 0) {
                                msg = "No se ha encontrado el proyecto.";
                                console.error(msg);
                                res.json({ Exito: false, msg: msg });
                            }else {
                                res.json({ Exito: true, msg: "El proyecto fue eliminado satisfactoriamente." });
                            }
                        }
                    });
                }
            }
        });
    }
}

controller.continuar = async (req, res) => {
    let msg;
    if (req.body.id == 0 || req.body.id == null || req.body.id == undefined) {
        msg = "El id es inválido";
        console.log(msg);
        res.json({Exito: false, msg: msg});
    } else {
        if (req.session.correo === undefined) {
            msg = "Usted debe tener una sesión activa.";
            console.log(msg);
            res.json({ Exito: false, msg: msg });
        } else {
            req.getConnection((error, conexion) => {
                if (error) {
                    msg = "Ocurrió un error inesperado en la conexión.";
                    console.log(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    conexion.query('SELECT * FROM proyectos WHERE id_proyecto = ? AND correo = ?', [req.body.id, req.session.correo], (error, respuesta) => {
                        if (error) {
                            msg = "Error en la consulta a la base de datos.";
                            console.log(msg);
                            res.json({Exito: false, msg: msg});
                        } else {
                            if (respuesta.length == 0) {
                                msg = "Error en la consulta a la base de datos.";
                                console.log(msg);
                                res.json({Exito: false, msg: msg});
                            } else {
                                console.log(respuesta);
                                req.session.nombre_proyecto = respuesta[0].nombre_proyecto;
                                req.session.tipo_proyecto = respuesta[0].tipo_proyecto;
                                res.json({Exito: true, msg: "Proyecto encontrado.", tipo: respuesta[0].tipo_proyecto});
                            }
                        }
                    });
                }
            });
        }
    }
}

module.exports = controller;
