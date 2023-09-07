const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.list);
router.post('/', usuariosController.view);
module.exports = router;