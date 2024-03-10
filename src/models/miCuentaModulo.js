import {connection} from '../server.js'

export class miCuentaModulo {
    static datos = async ({req}) => {
        let msg;
        let historial = [];
    
        try {
            if (req.session.correo === undefined) {
                msg = "Usted debe tener una sesión activa.";
                console.error(msg);
                return{ Exito: false, msg: msg };
            }

            const [compras] = await connection.query('SELECT id_producto, fecha_compra FROM compra WHERE id_usuario = ?', [req.session.id_usuario])
    
            for (let i = 0; i < compras.length; i++) {
                const [tienda] = await connection.query('SELECT nombre, precio FROM tienda WHERE id_producto = ?', [compras[i].id_producto])
    
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
            return{ Exito: true, historial: historial, datos: req.session, msg: msg};
        } catch (error) {
            return{ Exito: false, msg: error };
        }
    }

    static post = async ({req}) => {
        let msg;
        if(req.body.contrasena){

            bcrypt.hash(req.body.contrasena, 12).then(hash => {
                req.body.contrasena = hash;
            });

            try {
                const [filas] = await connection.query('SELECT correo FROM usuario WHERE correo = ?', [req.body.correo])

                console.log("Correo inicial: " + req.body.correoInicial + " correo normal: " + req.body.correo);

                if (req.body.correoInicial == req.body.correo){
                    const [resultado] = await connection.query("UPDATE usuario SET nombre = ?, contrasena = ? WHERE correo = ?", [req.body.nombre_usuario, req.body.contrasena, req.body.correoInicial])

                    return{ Exito: true, msg: "Datos cambiados correctamente.", correo: req.body.correo, contrasena: req.body.contrasena};
                }else{
                    
                    if (filas.length > 0) {
                        msg = "El correo ya está en uso.";
                        console.error(msg);
                        return{ Exito: false, msg: msg };
                    }else{
                        const [resultado] = await connection.query("UPDATE usuario SET nombre = ?, contrasena = ?, correo = ? WHERE correo = ?", [req.body.nombre_usuario, req.body.contrasena, req.body.correo, req.body.correoInicial])

                        return{ Exito: true, msg: "Datos cambiados correctamente.", correo: req.body.correo, contrasena: req.body.contrasena};
                    }
                }

            } catch(e) {
                msg = 'Ocurrio un error durante la consulta.';
                console.error(msg);
                return{ Exito: false, msg: msg };
            }
        
        }else {
           // Verificar si el correo ya está en uso
           try {
            const [filas] = await connection.query('SELECT correo FROM usuario WHERE correo = ?', [req.body.correo])

            console.log("Correo inicial: " + req.body.correoInicial + " correo normal: " + req.body.correo);

                if (req.body.correoInicial == req.body.correo){
                    const [resultado] = await connection.query("UPDATE usuario SET nombre = ? WHERE correo = ?", [req.body.nombre_usuario, req.body.correoInicial])

                    return{ Exito: true, msg: "Datos cambiados correctamente.", correo: req.body.correo, contrasena: req.body.contrasena};
                }else{
                    
                    if (filas.length > 0) {
                        msg = "El correo ya está en uso.";
                        console.error(msg);
                        return{ Exito: false, msg: msg };
                    }else{
                        const [resultado] = await connection.query("UPDATE usuario SET nombre = ?, correo = ? WHERE correo = ?", [req.body.nombre_usuario, req.body.correo, req.body.correoInicial])

                        return{ Exito: true, msg: "Datos cambiados correctamente.", correo: req.body.correo, contrasena: req.body.contrasena};
                        
                    }
                }

           } catch (e) {
                msg = 'Ocurrio un error durante la consulta.';
                console.error(msg);
                return{ Exito: false, msg: msg };
           }
        }
    }
}