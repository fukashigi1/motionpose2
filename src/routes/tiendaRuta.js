const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', tiendaController.view);
module.exports = router;