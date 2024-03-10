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
                        filas = filas[0];
                        bcrypt.compare(req.body.contrasena, filas.contrasena, (error, coinciden) => {
                            if (error){
                                Exito = false;
                                msg = "Ha ocurrido un error inesperado en la consulta bcrypt.";
                                console.error(msg);
                                return{Exito: Exito, msg: msg};
                            }else{
                                if(coinciden == true) {
                                    msg = "Iniciando sesión...";
                                    Exito = true;
                                    loggedin = true;
                                    nombre_usuario = filas.nombre_usuario;
                                    correo = filas.correo;
                                    id_usuario = filas.id_usuario;
                                    contrasena = filas.contrasena;
                                    id_tipo = filas.id_tipo;
                                    return {Exito: Exito, msg: msg, correo: req.body.correo, contrasena: contrasena, datos: {loggedin, nombre_usuario, correo, id_usuario, contrasena, id_tipo}};

                                }else{
                                    msg = "Correo o contraseña incorrecta."
                                    Exito = false;
                                    return{Exito: Exito, msg: msg};
                                }
                            }
                        });
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