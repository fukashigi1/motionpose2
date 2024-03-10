import {connection} from '../server.js'
import bcrypt from 'bcrypt'

export class usuariosModulo {
    static post = async ({req}) => {
        console.log("controller.post");
        let Exito;
        let contrasena =  req.body.contrasena;
        let msg;
        if (req.body.correo == '' || req.body.correo === undefined) {
            Exito = false;
            msg = "El correo no puede estár vacío.";
            console.error(msg);
            return{Exito: Exito, msg: msg};
        }else{
            //console.log("Llegue");
            try {
                
                const [filas] = await connection.query('SELECT * FROM usuario WHERE correo = ? AND estado = 1', [req.body.correo])
                if (filas != undefined){
                    if(filas.length == 0){
                        Exito = false;
                        msg = "No se encontró el correo.";
                        console.error(msg);
                        return{Exito: Exito, msg: msg};
                    }else{
                        let resultadoFilas = filas[0];
                        
                        const isPasswordCorrect = await bcrypt.compare(req.body.contrasena, resultadoFilas.contrasena)

                        if(isPasswordCorrect == true) {
                            msg = "Iniciando sesión...";
                            let loggedin = true;
                            let nombre_usuario = resultadoFilas.nombre;
                            let correo = resultadoFilas.correo;
                            let id_usuario = resultadoFilas.id_usuario;
                            let contrasena = resultadoFilas.contrasena;
                            let id_tipo = resultadoFilas.id_tipo;

                            return {Exito: true, msg: msg, correo: req.body.correo, contrasena: contrasena, datos: {loggedin, nombre_usuario, correo, id_usuario, contrasena, id_tipo}};

                        }else{
                            msg = "Correo o contraseña incorrecta."
                            Exito = false;
                            return{Exito: Exito, msg: msg};
                        }
                    }
                }
            } catch (e) {
                msg = 'Ha ocurrido un error interno.';
                console.error(e);
                return{Exito: false, msg: msg};
            }
        }
    }
}