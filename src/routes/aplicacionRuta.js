const express = require('express');
const router = express.Router();
const aplicacionController = require('../controllers/aplicacionController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', aplicacionController.view);
router.get('/datosproyecto', aplicacionController.obtenerDatosProyecto);
module.exports = router;