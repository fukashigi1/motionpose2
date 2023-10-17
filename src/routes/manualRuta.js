const express = require('express');
const router = express.Router();
const manualController = require('../controllers/manualController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', manualController.view);
module.exports = router;