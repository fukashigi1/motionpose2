const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', usuariosController.view);
router.post('/', usuariosController.post);
module.exports = router;