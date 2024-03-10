import path from 'path'
import { lobbyModulo } from '../models/lobbyModulo.js';

export class lobbyController {
    static async view (req, res) {
        if (req.session.loggedin != true) {
            res.redirect('/login');
            //res.sendFile(path.join(__dirname, '..', 'view', 'lobby.html'));
        } else {
            res.sendFile(path.join(__dirname, '..', 'view', 'lobby.html'));
        }
    }

    static async crear (req, res) {
        const respuestaModulo = await lobbyModulo.crear({req})
        res.json(respuestaModulo)
    }

    static async salir (req, res) {
        if (req.session.loggedin == true) {
            req.session.destroy();
        }
        res.redirect('/login');
    }
}