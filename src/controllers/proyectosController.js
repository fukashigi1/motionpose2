const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    }
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
                conexion.query('SELECT * FROM proyecto WHERE id_usuario = ?', [req.session.id_usuario], (error, filas) => {
                console.log("correo");
                console.log(req.session.id_usuario);
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
                    if (req.session.id_usuario === undefined) {
                        msg = "Usted debe tener una sesión activa.";
                        console.error(msg);
                        res.json({ Exito: false, msg: msg });
                    } else {
                        conexion.query("UPDATE proyecto SET nombre = '" + req.body.nombre + "' WHERE id_usuario = '" + req.session.id_usuario + "' AND id_proyecto = '" + req.body.id + "'", (error, resultado) => {
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
                if (req.session.id_usuario === undefined) {
                    msg = "Usted debe tener una sesión activa.";
                    console.error(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    const query = "DELETE FROM proyecto WHERE id_usuario = ? AND id_proyecto = ?";
                    const values = [req.session.id_usuario, parseInt(req.body.id)];
                    console.log("ACA DROGAAS AKLFJHASDKFGHASD FHJKDASGFHJASGDFJHGDSA FJHK",[req.session.id_usuario, req.body.id] )
                    conexion.query(query, values, (error, resultado) => {
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
    }//
}

controller.continuar = async (req, res) => {
    let msg;
    if (req.body.id == 0 || req.body.id == null || req.body.id == undefined) {
        msg = "El id es inválido";
        console.log(msg);
        res.json({Exito: false, msg: msg});
    } else {
        if (req.session.id_usuario === undefined) {
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
                    conexion.query('SELECT * FROM proyecto WHERE id_proyecto = ? AND id_usuario = ?', [req.body.id, req.session.id_usuario], (error, respuesta) => {
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
                                req.session.nombre_proyecto = respuesta[0].nombre;
                                req.session.tipo_proyecto = respuesta[0].id_tipo;
                                req.session.id_proyecto = req.body.id;
                                res.json({Exito: true, msg: "Proyecto encontrado.", tipo: respuesta[0].id_tipo});
                            }
                        }
                    });
                }
            });
        }
    }
}

module.exports = controller;
