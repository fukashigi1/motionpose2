import path from 'path'
import { usuariosModulo } from '../models/usuariosModulo.js';

export class usuariosController {
    static async view (req, res) {
        if(req.session.loggedin != true){
            res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
        }else{
            res.redirect('/lobby');
        }
    }

    static async post (req, res) {
        const respuestaModulo = await usuariosModulo.post({req})

        if (respuestaModulo.Exito) {
            req.session.loggedin = respuestaModulo.loggedin;
            req.session.nombre_usuario = respuestaModulo.nombre_usuario;
            req.session.correo = respuestaModulo.correo;
            req.session.id_usuario = respuestaModulo.id_usuario;
            req.session.contrasena = respuestaModulo.contrasena;
            req.session.id_tipo = respuestaModulo.id_tipo;
        }
        res.json(respuestaModulo)
        
    }
}