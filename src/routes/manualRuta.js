import express from 'express'
import { manualController } from '../controllers/manualController.js'

export const manualRuta = express.Router();
manualRuta.use(express.urlencoded({ extended: false }));
manualRuta.use(express.json());

manualRuta.get('/', manualController.view);