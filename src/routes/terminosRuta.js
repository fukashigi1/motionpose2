import express from 'express'
import { terminosController } from '../controllers/terminosController.js'

export const terminosRuta = express.Router();

terminosRuta.use(express.urlencoded({ extended: false }));
terminosRuta.use(express.json());

terminosRuta.get('/', terminosController.view);