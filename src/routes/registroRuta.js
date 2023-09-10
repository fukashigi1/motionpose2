const express = require('express');
const router = express.Router();
const registroControllers = require('../controllers/registroController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', registroControllers.view);
router.post('/', registroControllers.post);
module.exports = router;