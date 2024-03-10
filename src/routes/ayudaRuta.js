import { express } from 'express'
import { ayudaController } from '../controllers/ayudaController.js'

export const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', ayudaController.view);
