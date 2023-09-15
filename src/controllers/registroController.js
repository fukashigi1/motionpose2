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

        console.log(req.body.contrasena);

        req.getConnection((error, conexion) => {
            if (error) {
                msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
                console.error(msg);
                res.json({ Exito: false, msg: msg });
            } else {
                // Verificar si el correo ya está en uso
                conexion.query('SELECT correo FROM usuarios WHERE correo = ?', [req.body.correo], (error, filas) => {
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
                            conexion.query("INSERT INTO usuarios (nombre_usuario, contrasena, correo) VALUES (?, ?, ?)", [req.body.nombre, req.body.contrasena, req.body.correo], (error, resultado) => {
                                if (error) {
                                    msg = error.code;
                                    console.error(msg);
                                    res.json({ Exito: false, msg: msg });
                                } else {
                                    res.json({ Exito: true, msg: "Usuario registrado exitosamente.", correo: req.body.correo, contrasena: req.body.contrasena});
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
