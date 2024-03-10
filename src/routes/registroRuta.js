import express from 'express'
import { registroController } from '../controllers/registroController.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', registroController.view);
router.post('/', registroController.post);