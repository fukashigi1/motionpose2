import { express } from 'express'
import { manualController } from '../controllers/manualController.js'

const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', manualController.view);