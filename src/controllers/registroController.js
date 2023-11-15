const controller = {};
const path = require('path');
const bcrypt = require('bcrypt');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        res.sendFile(path.join(__dirname, '..', 'view', 'registro.html'));
    }else{
        res.redirect('/lobby');
    }
};
controller.post = async (req, res) => {
    let msg;
    bcrypt.hash(req.body.contrasena, 12).then(hash => {
        req.body.contrasena = hash;

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
                        if (filas.length > 0) {
                            msg = "El correo ya está en uso.";
                            console.error(msg);
                            res.json({ Exito: false, msg: msg });
                        } else {
                            // Insertar nuevo usuario
                            conexion.query("INSERT INTO usuario (id_tipo, nombre, correo, contrasena, estado) VALUES (1, ?, ?, ?, 1)", [req.body.nombre, req.body.correo, req.body.contrasena], (error, resultado) => {
                                if (error) {
                                    msg = error.code;
                                    console.error(msg);
                                    res.json({ Exito: false, msg: msg });
                                } else {
                                    res.json({ Exito: true, msg: "Usuario registrado exitosamente.", correo: req.body.correo, contrasena: req.body.contrasena, telefono: req.body.telefono});
                                }
                            });
                        }
                    }
                });
            }
        });
    });
}

module.exports = controller;
