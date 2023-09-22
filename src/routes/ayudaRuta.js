const express = require('express');
const router = express.Router();
const ayudaController = require('../controllers/ayudaController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', ayudaController.view);



module.exports = router;