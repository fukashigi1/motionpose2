import express from 'express'
import { proyectosController } from '../controllers/proyectosController.js'

export const proyectosRuta = express.Router();

proyectosRuta.use(express.urlencoded({ extended: false }));
proyectosRuta.use(express.json());

proyectosRuta.get('/', proyectosController.view);
proyectosRuta.get('/obtenerproyectos', proyectosController.obtenerProyectos);
proyectosRuta.post('/cambiarnombre', proyectosController.cambiarNombre);
proyectosRuta.post('/eliminarproyecto', proyectosController.eliminarProyecto);
proyectosRuta.post('/continuar', proyectosController.continuar);