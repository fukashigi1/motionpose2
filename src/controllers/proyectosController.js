import path from 'path'
import { proyectosModulo } from '../models/proyectosModulo.js';

export class proyectosController {
    static async view (req, res) {
        if (req.session.loggedin != true) {
            res.redirect('/login');
            //res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
        } else {
            res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
        }
    }

    static async obtenerProyectos (req, res) {
        const respuestaModulo = await proyectosModulo.obtenerProyectos({req})
        res.json(respuestaModulo)
    }

    static async cambiarNombre (req, res) {
        const respuestaModulo = await proyectosModulo.cambiarNombre({req})
        res.json(respuestaModulo)
    }

    static async eliminarProyecto (req, res) {
        const respuestaModulo = await proyectosModulo.eliminarProyecto({req})
        res.json(respuestaModulo)
    }

    static async continuar (req, res) {
        const respuestaModulo = await proyectosModulo.continuar({req})
        const {nombre_proyecto, tipo_proyecto, id_proyecto} = respuestaModulo.datos
        if (respuestaModulo.Exito){
            req.session.nombre_proyecto = nombre_proyecto;
            req.session.tipo_proyecto = tipo_proyecto;
            req.session.id_proyecto = id_proyecto;
        }

        res.json(respuestaModulo)
    }
}