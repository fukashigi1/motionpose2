import express from 'express'
import { miCuentaController } from '../controllers/miCuentaController.js'

export const miCuentaRuta = express.Router();

miCuentaRuta.use(express.urlencoded({ extended: false }));
miCuentaRuta.use(express.json());

miCuentaRuta.get('/', miCuentaController.view);
miCuentaRuta.get('/datos', miCuentaController.datos);
miCuentaRuta.post('/', miCuentaController.post);