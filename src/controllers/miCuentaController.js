import path from 'path'
import bcrypt from 'bcrypt'
import { miCuentaModulo } from '../models/miCuentaModulo.js';

export class miCuentaController {
    static async view (req, res) {
        if(req.session.loggedin != true){
            res.redirect('/login');
            //res.sendFile(path.join(__dirname, '..', 'view', 'miCuenta.html'));
        }else{
            res.sendFile(path.join(__dirname, '..', 'view', 'miCuenta.html'));
        }
    }

    static async salir (req, res) {
        if(req.session.loggedin == true){
            req.session.destroy();
        }
        res.redirect('/login');
    }
    
    static async datos (req, res) {
        const respuestaModulo = await miCuentaModulo.datos({req})
        res.json(respuestaModulo)
    }

    static async post (req, res) {
        const respuestaModulo = await miCuentaModulo.post({req})
        res.json(respuestaModulo)
    }
}