import express  from 'express'
import { usuariosController } from '../controllers/usuariosController.js'

export const usuarioRuta = express.Router();

usuarioRuta.use(express.urlencoded({ extended: false }));
usuarioRuta.use(express.json());

usuarioRuta.get('/', usuariosController.view);
usuarioRuta.post('/', usuariosController.post);

/*router.post('/', usuariosController.post, (req, res, next) => {
    // Si las credenciales son correctas, establece las cookies con los datos del usuario
    if (req.coindiden == true) {
        const { correo } = req.filas;
        const { id_usuario } = req.filas;

        res.cookie('correo', correo, { maxAge: 900000, httpOnly: true });
        res.cookie('id_usuario', id_usuario, { maxAge: 900000, httpOnly: true });

        req.session.loggedin = true;
        req.session.correo = correo;
        req.session.id_usuario = id_usuario;
    }
    next();
});*/