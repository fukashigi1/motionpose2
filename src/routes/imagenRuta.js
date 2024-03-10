import express from 'express'
import { imagenController } from '../controllers/imagenController.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', imagenController.view);