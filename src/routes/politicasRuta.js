const express = require('express');
const router = express.Router();
const politicasController = require('../controllers/politicasController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', politicasController.view);
module.exports = router;