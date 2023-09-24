const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'tienda.html'));
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'tienda.html'));
    }
};

controller.comprar = async (req, res) => {
    let msg;
    req.getConnection((error, conexion) =>{
        if (error) {
            msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
            console.error(msg);
            res.json({ Exito: false, msg: msg });
        } else {
            conexion.query("UPDATE usuarios SET tipo_usuario = '" + req.body.membresia + "' WHERE correo = '" + req.session.correo + "'", (error, resultado) => {
                console.log(req.body.membresia);
                console.log(req.session.correo);
                if (error) {
                    msg = error.code;
                    console.error(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    console.log(resultado);
                    if (resultado.affectedRows == 0 ){
                        msg = "Error inesperado, no se ha hecho ningún cambio.";
                        console.error(msg);
                        res.json({ Exito: false, msg: msg });
                    }else if (resultado.changedRows == 0){
                        msg = "Al parecer ya eres poseedor de esta membresía.";
                        console.error(msg);
                        res.json({ Exito: false, msg: msg });
                    }else{
                        if(req.session.loggedin == true){
                            conexion.query('SELECT tipo_usuario FROM usuarios WHERE correo = ?', [req.session.correo], (error, filas) => {
                                if (error) {
                                    msg = error.code;
                                    console.error(msg);
                                    res.json({ Exito: false, msg: msg });
                                } else {
                                    req.session.tipo_usuario = filas[0].tipo_usuario;
                                    console.log("session: " + req.session.tipo_usuario);
                                    console.log("SESSION");
                                    console.log(req.session);
                                    req.session.save((err) => {
                                        if (err) {
                                          console.error(err);
                                          res.json({ Exito: false, msg: err });
                                        }
                                        // Redirige o envía una respuesta al cliente
                                        res.json({ Exito: true, msg: "Gracias por confiar en nosotros, por favor disfruta de tu nueva membresía."});
                                      });
                                }
                            });
                        }
                        
                    }
                }
            });
        }
    });
}

module.exports = controller;
