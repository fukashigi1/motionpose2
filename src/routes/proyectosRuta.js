const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', proyectosController.view);
router.get('/obtenerproyectos', proyectosController.obtenerProyectos);
router.post('/cambiarnombre', proyectosController.cambiarNombre);
router.post('/eliminarproyecto', proyectosController.eliminarProyecto);
router.post('/continuar', proyectosController.continuar);
module.exports = router;