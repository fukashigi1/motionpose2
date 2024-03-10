import path from 'path'
import { aplicacionModulo } from '../models/aplicacionModulo.js';

export class aplicacionController {
    static async view (req, res) {
        if (req.session.loggedin != true) {
            res.redirect('/login');
            //res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
        } else {
            if (req.session.tipo_proyecto !== undefined) {
                if (req.session.tipo_proyecto == '1') {
                    res.sendFile(path.join(process.cwd(), 'src', 'view', 'imagen.html'));
                } else if (req.session.tipo_proyecto == '2') {
                    res.sendFile(path.join(process.cwd(), 'src', 'view', 'video.html'));
                } else if (req.session.tipo_proyecto == '3') {
                    res.sendFile(path.join(process.cwd(), 'src', 'view', '3d.html'));
                } else if (req.session.tipo_proyecto == '4') {
                    res.sendFile(path.join(process.cwd(), 'src', 'view', 'animacion.html'));
                }
            } else {
                res.redirect('/proyectos'); //a
            }
        }
    }

    static async obtenerDatosProyecto (req, res) {
        const respuestaModelo = await aplicacionModulo.obtenerDatosProyecto({req})
        res.json(respuestaModelo)
    }
    
    static async guardar (req, res) {
        const respuestaModelo = await aplicacionModulo.guardar({req})
        res.json(respuestaModelo)
    }

    static async cargar (req, res) {
        const respuestaModelo = await aplicacionModulo.cargar({req})
        res.json(respuestaModelo)
    }
}