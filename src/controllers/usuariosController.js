import path from 'path'
import { usuariosModulo } from '../models/usuariosModulo.js';

export class usuariosController {
    static async view (req, res) {
        if(req.session.loggedin != true){
            res.sendFile(path.join(process.cwd(), 'src', 'view', 'login.html'));
        }else{
            res.redirect('/lobby');
        }
    }

    static async post (req, res) {
        const respuestaModulo = await usuariosModulo.post({req})
        if (respuestaModulo.Exito) {
            req.session.loggedin = respuestaModulo.datos.loggedin;
            req.session.nombre_usuario = respuestaModulo.datos.nombre_usuario;
            req.session.correo = respuestaModulo.datos.correo;
            req.session.id_usuario = respuestaModulo.datos.id_usuario;
            req.session.contrasena = respuestaModulo.datos.contrasena;
            req.session.id_tipo = respuestaModulo.datos.id_tipo;
        }
        res.json(respuestaModulo)
        
    }
}