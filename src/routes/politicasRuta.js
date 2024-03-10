import { express } from 'express'
import { politicasController } from '../controllers/politicasController.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', politicasController.view);