const controller = {};
const path = require('path');

controller.view = (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'view', 'registro.html'));
};
controller.post = async (req, res) => {
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let contrasena =  req.body.contrasena;
    let msg;

    req.getConnection((error, conexion) => {
        if (error) {
            msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
            console.error(msg);
            res.json({ Exito: false, msg: msg });
        } else {
            // Verificar si el correo ya está en uso
            conexion.query('SELECT correo FROM usuarios WHERE correo = ?', [correo], (error, filas) => {
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
                        conexion.query("INSERT INTO usuarios (nombre_usuario, contrasena, correo) VALUES (?, ?, ?)", [nombre, contrasena, correo], (error, resultado) => {
                            if (error) {
                                msg = error.code;
                                console.error(msg);
                                res.json({ Exito: false, msg: msg });
                            } else {
                                res.json({ Exito: true, msg: "Usuario registrado exitosamente.", correo: correo, contrasena: contrasena});
                            }
                        });
                    }
                }
            });
        }
    });
}

module.exports = controller;
