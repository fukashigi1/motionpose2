import { express } from 'express'
import { aplicacionController } from '../controllers/aplicacionController.js'

export const router = express.Router()

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', aplicacionController.view);
router.get('/datosproyecto', aplicacionController.obtenerDatosProyecto);
router.get('/cargar', aplicacionController.cargar);
router.post('/guardar', aplicacionController.guardar)