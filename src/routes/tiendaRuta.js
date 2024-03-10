import { express } from 'express'
import { tiendaController } from '../controllers/tiendaController.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', tiendaController.view);
router.post('/comprar', tiendaController.comprar)