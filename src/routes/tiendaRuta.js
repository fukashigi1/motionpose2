import express from 'express'
import { tiendaController } from '../controllers/tiendaController.js'

export const tiendaRuta = express.Router();

tiendaRuta.use(express.urlencoded({ extended: false }));
tiendaRuta.use(express.json());

tiendaRuta.get('/', tiendaController.view);
tiendaRuta.post('/comprar', tiendaController.comprar)