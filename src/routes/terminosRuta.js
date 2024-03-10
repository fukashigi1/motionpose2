import { express } from 'express'
import { terminosController } from '../controllers/terminosController.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', terminosController.view);