const controller = {};
const path = require('path');
const bcrypt = require('bcrypt');

controller.view = async (req, res)=>{
    req.session.loggedin = true;
    req.session.id_usuario = 1;
    req.session.nombre_usuario = "test";
    req.session.correo = "test@test.test";
    req.session.contrasena = "Tester_123";
    req.session.id_tipo = 2;
    req.session.tipo_proyecto = "1";
    req.session.nombre_proyecto = "sexo";
    req.session.id_proyecto = 1;
    if(req.session.loggedin != true){
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'miCuenta.html'));
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'miCuenta.html'));
    }

    
};

controller.salir = async (req, res) => {
    if(req.session.loggedin == true){
        req.session.destroy();
    }
    res.redirect('/login');
}
controller.datos = async (req, res) => {
    let msg;
    let historial = [];

    try {
        if (req.session.correo === undefined) {
            msg = "Usted debe tener una sesión activa.";
            console.error(msg);
            res.json({ Exito: false, msg: msg });
            return;
        }

        const compras = await new Promise((resolve, reject) => {
            req.getConnection((error, conexion) => {
                if (error) {
                    msg = "Ha ocurrido un error inesperado en la consulta.";
                    console.error(msg);
                    reject(msg);
                } else {
                    conexion.query('SELECT id_producto, fecha_compra FROM compra WHERE id_usuario = ?', [req.session.id_usuario], (error, result) => {
                        if (error) {
                            msg = error.code;
                            console.error(msg);
                            reject(msg);
                        } else {
                            resolve(result);
                        }
                    });
                }
            });
        });

        for (let i = 0; i < compras.length; i++) {
            const tienda = await new Promise((resolve, reject) => {
                req.getConnection((error, conexion) => {
                    if (error) {
                        msg = "Ha ocurrido un error inesperado en la consulta.";
                        console.error(msg);
                        reject(msg);
                    } else {
                        conexion.query('SELECT nombre, precio FROM tienda WHERE id_producto = ?', [compras[i].id_producto], (error, result) => {
                            if (error) {
                                msg = error.code;
                                console.error(msg);
                                reject(msg);
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });

            historial.push({
                id_producto: compras[i].id_producto,
                fecha_compra: compras[i].fecha_compra,
                nombre_producto: tienda[0].nombre,
                precio: tienda[0].precio
            });
        }

        if (historial.length == 0) {
            msg = "Por el momento no tienes compras."
        } 
        res.json({ Exito: true, historial: historial, datos: req.session, msg: msg});
    } catch (error) {
        res.json({ Exito: false, msg: error });
    }
};

controller.post = async (req, res) => {
    let msg;
    if(req.body.contrasena){
        bcrypt.hash(req.body.contrasena, 12).then(hash => {
            req.body.contrasena = hash;
    
            console.log(req.body.contrasena);
    
            req.getConnection((error, conexion) => {
                if (error) {
                    msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                    console.error(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    // Verificar si el correo ya está en uso
                    conexion.query('SELECT correo FROM usuario WHERE correo = ?', [req.body.correo], (error, filas) => {
                        if (error) {
                            msg = error.code;
                            console.error(msg);
                            res.json({ Exito: false, msg: msg });
                        } else {
                            console.log("Correo inicial: " + req.body.correoInicial + " correo normal: " + req.body.correo);
                            if (req.body.correoInicial == req.body.correo){
                                conexion.query("UPDATE usuario SET nombre = '" + req.body.nombre_usuario + "', contrasena = '" + req.body.contrasena + "' WHERE correo = '" + req.body.correoInicial + "'", (error, resultado) => {
                                    console.log(req.body);
                                    if (error) {
                                        msg = error.code;
                                        console.error(msg);
                                        res.json({ Exito: false, msg: msg });
                                    } else {
                                        res.json({ Exito: true, msg: "Datos cambiados correctamente.", correo: req.body.correo, contrasena: req.body.contrasena});
                                    }
                                });
                            }else{
                                console.log("60");
                                if (filas.length > 0) {
                                    msg = "El correo ya está en uso.";
                                    console.error(msg);
                                    res.json({ Exito: false, msg: msg });
                                }else{
                                    conexion.query("UPDATE usuario SET nombre = '" + req.body.nombre_usuario + "', contrasena = '" + req.body.contrasena + "', correo = '" + req.body.correo + "' WHERE correo = '" + req.body.correoInicial + "'", (error, resultado) => {
                                        if (error) {
                                            msg = error.code;
                                            console.error(msg);
                                            res.json({ Exito: false, msg: msg });
                                        } else {
                                            res.json({ Exito: true, msg: "Datos cambiados correctamente.", correo: req.body.correo, contrasena: req.body.contrasena});
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
        });
    }else {
        req.getConnection((error, conexion) => {
            if (error) {
                msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                console.error(msg);
                res.json({ Exito: false, msg: msg });
            } else {
                // Verificar si el correo ya está en uso
                conexion.query('SELECT correo FROM usuario WHERE correo = ?', [req.body.correo], (error, filas) => {
                    if (error) {
                        msg = error.code;
                        console.error(msg);
                        res.json({ Exito: false, msg: msg });
                    } else {
                        console.log("Correo inicial: " + req.body.correoInicial + " correo normal: " + req.body.correo);
                        if (req.body.correoInicial == req.body.correo){
                            conexion.query("UPDATE usuario SET nombre = '" + req.body.nombre_usuario + "' WHERE correo = '" + req.body.correoInicial + "'", (error, resultado) => {
                                console.log(req.body);
                                if (error) {
                                    msg = error.code;
                                    console.error(msg);
                                    res.json({ Exito: false, msg: msg });
                                } else {
                                    res.json({ Exito: true, msg: "Datos cambiados correctamente.", correo: req.body.correo, contrasena: req.body.contrasena});
                                }
                            });
                        }else{
                            console.log("60");
                            if (filas.length > 0) {
                                msg = "El correo ya está en uso.";
                                console.error(msg);
                                res.json({ Exito: false, msg: msg });
                            }else{
                                conexion.query("UPDATE usuario SET nombre = '" + req.body.nombre_usuario + "', correo = '" + req.body.correo + "' WHERE correo = '" + req.body.correoInicial + "'", (error, resultado) => {
                                    if (error) {
                                        msg = error.code;
                                        console.error(msg);
                                        res.json({ Exito: false, msg: msg });
                                    } else {
                                        res.json({ Exito: true, msg: "Datos cambiados correctamente.", correo: req.body.correo, contrasena: req.body.contrasena});
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    }
};
module.exports = controller;
