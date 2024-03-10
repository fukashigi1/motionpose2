import { connection } from '../server.js'
import bcrypt from 'bcrypt'

export class registroModulo {
    static post = async ({req}) => {
        let msg;
        const hash = await bcrypt.hash(req.body.contrasena, 12)
        req.body.contrasena = hash;

        try {
            const [filas] = await connection.query('SELECT correo FROM usuario WHERE correo = ?', [req.body.correo])

            if (filas.length > 0) {
                msg = "El correo ya está en uso.";
                console.error(msg);
                return{ Exito: false, msg: msg };
            } else {
                // Insertar nuevo usuario
                const [resultado] = await connection.query("INSERT INTO usuario (id_tipo, nombre, correo, contrasena, estado) VALUES (1, ?, ?, ?, 1)", [req.body.nombre, req.body.correo, req.body.contrasena])

                return{ Exito: true, msg: "Usuario registrado exitosamente.", correo: req.body.correo, contrasena: req.body.contrasena, telefono: req.body.telefono};
            }
        } catch (e) {
            msg = 'Ha ocurrido un error interno.';
            console.error(e);
            return{ Exito: false, msg: msg };
        }

        
    }
}