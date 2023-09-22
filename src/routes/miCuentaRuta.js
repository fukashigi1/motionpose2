const express = require('express');
const router = express.Router();
const miCuentaController = require('../controllers/miCuentaController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.get('/', miCuentaController.view);
router.get('/datos', miCuentaController.datos);
router.post('/', miCuentaController.post);
module.exports = router;