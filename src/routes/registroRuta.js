import { express } from 'express'
import { registroControllers } from '../controllers/registroControllers.js'

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', registroControllers.view);
router.post('/', registroControllers.post);