const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.list);
module.exports = router;