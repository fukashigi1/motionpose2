const express = require('express');
const router = express.Router();
const miCuentaController = require('../controllers/miCuentaController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', miCuentaController.view);
router.get('/salir', miCuentaController.salir);
module.exports = router;