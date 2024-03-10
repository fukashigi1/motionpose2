import express from 'express'
import { politicasController } from '../controllers/politicasController.js'

export const politicasRuta = express.Router();

politicasRuta.use(express.urlencoded({ extended: false }));
politicasRuta.use(express.json());

politicasRuta.get('/', politicasController.view);