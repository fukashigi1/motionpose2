import { express } from 'express'
import { usuariosController } from '../controllers/usuariosController.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', usuariosController.view);
router.post('/crear', usuariosController.crear);
router.get('/salir', usuariosController.salir);
