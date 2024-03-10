import express from 'express'
import { registroController } from '../controllers/registroController.js'

export const registroRuta = express.Router();

registroRuta.use(express.urlencoded({ extended: false }));
registroRuta.use(express.json());

registroRuta.get('/', registroController.view);
registroRuta.post('/', registroController.post);