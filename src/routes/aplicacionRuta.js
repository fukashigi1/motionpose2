import express from 'express'
import {aplicacionController} from '../controllers/aplicacionController.js'

export const aplicacionRuta = express.Router()

aplicacionRuta.use(express.urlencoded({ extended: true }));
aplicacionRuta.use(express.json());

aplicacionRuta.get('/', aplicacionController.view);
aplicacionRuta.get('/datosproyecto', aplicacionController.obtenerDatosProyecto);
aplicacionRuta.get('/cargar', aplicacionController.cargar);
aplicacionRuta.post('/guardar', aplicacionController.guardar)