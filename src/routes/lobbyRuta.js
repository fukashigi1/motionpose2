const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/lobbyController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', usuariosController.view);
router.get('/datos', usuariosController.datos);
router.get('/salir', usuariosController.salir);
module.exports = router;