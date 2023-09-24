const express = require('express');
const router = express.Router();
const imagenController = require('../controllers/imagenController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', imagenController.view);
module.exports = router;