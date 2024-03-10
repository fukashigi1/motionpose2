import express from 'express'
import { lobbyController } from '../controllers/lobbyController.js'

export const lobbyRuta = express.Router();

lobbyRuta.use(express.urlencoded({ extended: false }));
lobbyRuta.use(express.json());

lobbyRuta.get('/', lobbyController.view);
lobbyRuta.post('/crear', lobbyController.crear);
lobbyRuta.get('/salir', lobbyController.salir);
