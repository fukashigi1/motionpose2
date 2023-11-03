const express = require('express');
const router = express.Router();
const aplicacionController = require('../controllers/aplicacionController');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', aplicacionController.view);
router.get('/datosproyecto', aplicacionController.obtenerDatosProyecto);
router.post('/guardar', aplicacionController.guardar)
module.exports = router;