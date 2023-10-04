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
            conexion.query('SELECT nombre_producto FROM tienda WHERE id_producto = ?', [req.body.membresia], (error, compras) => {
                if (error) {
                    msg = "Ha ocurrido un error inesperado en la consulta.";
                    console.error(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    if (compras.length == 0) {
                        msg = "Producto inválido.";
                        console.error(msg);
                        res.json({ Exito: false, msg: msg });
                    } else {
                        conexion.query("UPDATE usuarios SET tipo_usuario = '" + compras[0].nombre_producto + "' WHERE correo = '" + req.session.correo + "'", (error, resultado) => {
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
                                                req.session.save((err) => {
                                                    if (err) {
                                                      console.error(err);
                                                      res.json({ Exito: false, msg: err });
                                                    } else {
                                                        conexion.query('INSERT INTO compras (correo, id_producto) VALUES (?, ?)', [req.session.correo, req.body.membresia], (error, resultado) => {
                                                            if (error) {
                                                                msg = error.code;
                                                                console.error(msg);
                                                                console.error("aqui");
                                                                res.json({ Exito: false, msg: msg });
                                                            } else {
                                                                if (resultado.affectedRows == 0){
                                                                    msg = "Hubo un error en la compra.";
                                                                    console.error(msg);
                                                                    res.json({ Exito: false, msg: msg });
                                                                } else {
                                                                    res.json({ Exito: true, msg: "Gracias por confiar en nosotros, por favor disfruta de tu nueva membresía."});
                                                                }
                                                            }
                                                        });
                                                    }
                                                    // Redirige o envía una respuesta al cliente
                                                  });
                                            }
                                        });
                                    }
                                    
                                }
                            }
                        });
                    }
                }
            });
        }
    });
}

module.exports = controller;
