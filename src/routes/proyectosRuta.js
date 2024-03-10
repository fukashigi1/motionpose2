import express from 'express'
import { proyectosController } from '../controllers/proyectosController.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', proyectosController.view);
router.get('/obtenerproyectos', proyectosController.obtenerProyectos);
router.post('/cambiarnombre', proyectosController.cambiarNombre);
router.post('/eliminarproyecto', proyectosController.eliminarProyecto);
router.post('/continuar', proyectosController.continuar);