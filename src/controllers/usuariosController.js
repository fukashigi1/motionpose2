const controller = {};
const path = require('path');
const bcrypt = require('bcrypt');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
    }else{
        res.redirect('/lobby');
    }
};
controller.post = async (req, res) => {
    console.log("controller.post");
    let Exito;
    let contrasena =  req.body.contrasena;
    let msg;
    req.getConnection((error, conexion) =>{
        console.log("myconn");
        if(error) {
            Exito = false;
            msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
            console.error(msg);
            res.json({Exito: Exito, msg: msg});
        }else {
            console.log("Llegue");
            conexion.query('SELECT * FROM usuarios WHERE correo = ?', [req.body.correo], (error, filas) => {
                console.log(filas);
                if(error){
                    Exito = false;
                    msg = error.code;
                    console.error(msg);
                }else{
                    filas.forEach(elemento => {
                        console.log(elemento);
                        bcrypt.compare(req.body.contrasena, elemento.contrasena, (error, coinciden) => {
                            if (error){
                                Exito = false;
                                msg = "Ha ocurrido un error inesperado en la consulta bcrypt.";
                                console.error(msg);
                                es.json({Exito: Exito, msg: msg});
                            }else{
                                if(coinciden == true) {
                                    msg = "Iniciando sesión...";
                                    Exito = true;
                                    req.session.loggedin = true;
                                    req.session.nombre_usuario = elemento.nombre_usuario;
                                    req.session.correo = elemento.correo;
                                    req.session.contrasena = elemento.contrasena;
                                    req.session.tipo_usuario = elemento.tipo_usuario;

                                }else{
                                    msg = "Correo o contraseña incorrecta."
                                    Exito = false;
                                }
                                res.json({Exito: Exito, msg: msg, correo: req.body.correo, contrasena: contrasena});
                            }
                        });
                    });
                }
            });
        }
    });
    console.log(Exito);
}

module.exports = controller;
