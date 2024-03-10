import {connection} from '../server.js'

export class tiendaModulo {
    static comprar = async ({req}) => {
        let msg;
        try {
            const [compras] = await connection.query('SELECT nombre FROM tienda WHERE id_producto = ?', [req.body.membresia])

            if (compras.length == 0) {
                msg = "Producto inválido.";
                console.error(msg);
                return{ Exito: false, msg: msg };
            } else { 
                const [resultado] = await connection.query("UPDATE usuario SET id_tipo = (SELECT id_tipo FROM usuario_tipo WHERE tipo = ?) WHERE id_usuario = ?", [compras[0].nombre, req.session.id_usuario])

                console.log(resultado);

                if (resultado.affectedRows == 0 ){
                    msg = "Error inesperado, no se ha hecho ningún cambio.";
                    console.error(msg);
                    return{ Exito: false, msg: msg };

                }else if (resultado.changedRows == 0){
                    msg = "Al parecer ya eres poseedor de esta membresía.";
                    console.error(msg);
                    return{ Exito: false, msg: msg };

                }else{
                    if(req.session.loggedin == true){
                        const [filas] = await connection.query('SELECT id_tipo FROM usuario WHERE id_usuario = ?', [req.session.id_usuario])

                        tipo_usuario = filas[0].tipo_usuario;
                        const [resultado2] = await connection.query('INSERT INTO compra (id_usuario, id_producto, fecha_compra) VALUES (?, ?, ?)', [req.session.id_usuario, req.body.membresiafechaHoraActual.toISOString().slice(0, 19).replace('T', ' ')])

                        if (resultado2.affectedRows == 0){
                            msg = "Hubo un error en la compra.";
                            console.error(msg);
                            return{ Exito: false, msg: msg };
                        } else {
                            return{ Exito: true, msg: "Gracias por confiar en nosotros, por favor disfruta de tu nueva membresía.", tipo_usuario: tipo_usuario};
                        }
                        

                        /*req.session.save((err) => {
                            if (err) {
                                console.error(err);
                                res.json({ Exito: false, msg: err });
                            } else {
                                const fechaHoraActual = new Date();
                                conexion.query('INSERT INTO compra (id_usuario, id_producto, fecha_compra) VALUES (?, ?, ?)', [req.session.id_usuario, req.body.membresiafechaHoraActual.toISOString().slice(0, 19).replace('T', ' ')], (error, resultado) => {
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
                        });*/
                    }
                }
            }
        } catch(e) {
            msg = "Ha ocurrido un error inesperado en la consulta.";
            console.error(msg);
            return{ Exito: false, msg: msg };
        }
    }
}