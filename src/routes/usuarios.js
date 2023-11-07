const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', usuariosController.view);
router.post('/', usuariosController.post, (req, res, next) => {
    // Si las credenciales son correctas, establece las cookies con los datos del usuario
    if (req.coindiden == true) {
        const { correo } = req.elemento;

        res.cookie('correo', correo, { maxAge: 900000, httpOnly: true });

        req.session.loggedin = true;
        req.session.correo = correo;
    }
    next();
});
module.exports = router;