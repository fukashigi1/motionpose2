import express from 'express'
import { ayudaController } from '../controllers/ayudaController.js'

export const ayudaRuta = express.Router();

ayudaRuta.use(express.urlencoded({ extended: false }));
ayudaRuta.use(express.json());

ayudaRuta.get('/', ayudaController.view);
