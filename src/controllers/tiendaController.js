import path from 'path'
import { tiendaModulo } from '../models/tiendaModulo.js';

export class tiendaController {
    static async view (req, res) {
        if(req.session.loggedin != true){
            res.redirect('/login');
            //res.sendFile(path.join(__dirname, '..', 'view', 'tienda.html'));
        }else{
            res.sendFile(path.join(__dirname, '..', 'view', 'tienda.html'));
        }
    }

    static async comprar (req, res) {
        const resultadoModulo = await tiendaModulo.comprar({req})
        if (resultadoModulo.Exito) {
            req.session.tipo_usuario = resultadoModulo.tipo_usuario;
        }
        res.json(resultadoModulo)
    }
}