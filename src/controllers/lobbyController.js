const controller = {};
const path = require('path');

controller.view = async (req, res) => {
    if (req.session.loggedin != true) {
        res.redirect('/login');
        //res.sendFile(path.join(__dirname, '..', 'view', 'lobby.html'));
    } else {
        res.sendFile(path.join(__dirname, '..', 'view', 'lobby.html'));
    }
};
controller.crear = async (req, res) => {
    let msg;
    if (req.body.nombre_proyecto == '' || req.body.nombre_proyecto === undefined) {
        msg = "El nombre del proyecto no puede estár vacío.";
        console.error(msg);
        res.json({ Exito: false, msg: msg });

    } else if (req.body.nombre_proyecto.length > 30) {
        msg = "El nombre del proyecto puede tener como máximo 30 carácteres.";
        console.error(msg);
        res.json({ Exito: false, msg: msg });

    } else if (req.body.tipo_proyecto == '' || req.body.tipo_proyecto === undefined || (req.body.tipo_proyecto < 1 && req.body.tipo_proyecto > 4)) {
        msg = "Debes seleccionar una opción válida.";
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
                    console.log(req.session)
                    if (req.session.id_tipo == "1") {
                        conexion.query('SELECT COUNT(*) FROM proyecto WHERE id_usuario = ?', [req.session.id_usuario], (error, filas) => {
                            if (error) {
                                msg = error.code;
                                console.error(msg);
                                res.json({ Exito: false, msg: msg });
                            } else {
                                if (Object.values(filas[0])[0] < 2) {
                                    conexion.query('INSERT INTO proyecto (nombre, id_tipo, id_usuario) VALUES (?, ?, ?)', [req.body.nombre_proyecto, req.body.tipo_proyecto, req.session.id_usuario], (error, respuesta) => {
                                        if (error) {
                                            msg = error.code;
                                            console.error(msg);
                                            res.json({ Exito: false, msg: msg });
                                        } else {
                                            if (respuesta.affectedRows == 0) {
                                                msg = "Ocurrió un error inesperado en la consulta."
                                                console.error(msg);
                                                res.json({ Exito: false, msg: msg });
                                            } else {
                                                conexion.query('INSERT INTO preferencias (id_proyecto) VALUES (?)', [respuesta.insertId], (error, response) => {
                                                    console.log(response);
                                                    if (error) {
                                                        msg = error.code;
                                                        console.error(msg);
                                                        res.json({ Exito: false, msg: msg });
                                                    } else {
                                                        if (response.affectedRows == 0) {
                                                            msg = "Ocurrió un error inesperado en la consulta."
                                                            console.error(msg);
                                                            res.json({ Exito: false, msg: msg });
                                                        } else {
                                                            console.log(response);
                                                            res.json({ Exito: true, msg: "Proyecto creado satisfactoriamente." });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    msg = "Un usuario gratuito solo puede tener 2 proyectos simultáneos.";
                                    console.error(msg);
                                    res.json({ Exito: false, msg: msg });
                                }
                            }
                        });
                    } else {
                        conexion.query('SELECT COUNT(*) FROM proyecto WHERE id_usuario = ?', [req.session.id_usuario], (error, filas) => {
                            if (error) {
                                msg = error.code;
                                console.error(msg);
                                res.json({ Exito: false, msg: msg });
                            } else {
                                if (Object.values(filas[0])[0] < 10) {
                                    conexion.query('INSERT INTO proyecto (nombre, id_tipo, id_usuario) VALUES (?, ?, ?)', [req.body.nombre_proyecto, req.body.tipo_proyecto, req.session.id_usuario], (error, respuesta) => {
                                        console.log(respuesta);
                                        if (error) {
                                            msg = error.code;
                                            console.error(msg);
                                            res.json({ Exito: false, msg: msg });
                                        } else {
                                            if (respuesta.affectedRows == 0) {
                                                msg = "Ocurrió un error inesperado en la consulta."
                                                console.error(msg);
                                                res.json({ Exito: false, msg: msg });
                                            } else {
                                                conexion.query('INSERT INTO preferencias (id_proyecto) VALUES (?)', [respuesta.insertId], (error, response) => {
                                                    console.log(response);
                                                    if (error) {
                                                        msg = error.code;
                                                        console.error(msg);
                                                        res.json({ Exito: false, msg: msg });
                                                    } else {
                                                        if (response.affectedRows == 0) {
                                                            msg = "Ocurrió un error inesperado en la consulta."
                                                            console.error(msg);
                                                            res.json({ Exito: false, msg: msg });
                                                        } else {
                                                            console.log(response);
                                                            res.json({ Exito: true, msg: "Proyecto creado satisfactoriamente." });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    msg = "Un usuario VIP solo puede tener 10 proyectos simultáneos.";
                                    console.error(msg);
                                    res.json({ Exito: false, msg: msg });
                                }
                            }
                        });
                    }
                }
            }
        });
    }
};

controller.salir = async (req, res) => {
    if (req.session.loggedin == true) {
        req.session.destroy();
    }
    res.redirect('/login');
}

module.exports = controller;