import express from 'express'
import { imagenController } from '../controllers/imagenController.js'

export const imagenRuta = express.Router();

imagenRuta.use(express.urlencoded({ extended: false }));
imagenRuta.use(express.json());

router.get('/', imagenController.view);