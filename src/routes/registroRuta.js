const express = require('express');
const router = express.Router();

const registroControllers = require('../controllers/registroController');

router.get('/', registroControllers.vista);
module.exports = router;