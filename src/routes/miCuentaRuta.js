import { express } from 'express'
import { miCuentaController } from '../controllers/miCuentaController.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', miCuentaController.view);
router.get('/datos', miCuentaController.datos);
router.post('/', miCuentaController.post);