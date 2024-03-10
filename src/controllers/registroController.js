import path from 'path'
import bcrypt from 'bcrypt'
import { registroModulo } from '../models/registroModulo.js'

export class registroController {
    static async view (req, res) {
        if(req.session.loggedin != true){
            res.sendFile(path.join(process.cwd(), 'src', 'view', 'registro.html'));
        }else{
            res.redirect('/lobby');
        }
    }

    static async post (req, res) {
        const respuestaModulo = await registroModulo.post({req})
        res.json(respuestaModulo)
    }
}