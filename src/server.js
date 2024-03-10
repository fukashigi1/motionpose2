import express from 'express';

import morgan from 'morgan'
import path from 'path'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({ path: 'config.env' })
import compression from 'compression'
import session from 'express-session'


const app = express()

// Configuración de acceso a la base de datos
const URLBD = process.env.CONEXION_BASEDATOS_URLBD;
const USUARIOBD = process.env.CONEXION_BASEDATOS_USUARIOBD;
const CONTRASENABD = process.env.CONEXION_BASEDATOS_CONTRASENABD;
const PUERTOBD = process.env.CONEXION_BASEDATOS_PUERTOBD;
const NOMBREBD = process.env.CONEXION_BASEDATOS_NOMBREBD;
const PUERTO_SERVIDOR = process.env.PUERTO_SERVIDOR;
const NOMBRE_PROYECTO = process.env.NOMBRE_PROYECTO;
const VERSION_PROYECTO = process.env.VERSION_PROYECTO;

const config = {
    host: process.env.URLBD,
    user: process.env.USUARIOBD,
    port: process.env.PUERTOBD,
    password: process.env.CONTRASENABD,
    database: process.env.NOMBREBD
}
// Middlewares
app.use(compression())

app.use(express.static('public'));
app.use(morgan('dev'))

// Middleware para deshabilitar la caché

export let connection;

try {
    connection = await mysql.createConnection(config)
} catch (e) {
    console.log(e)
}

app.use(session({
    secret: 'secret',
    saveUninitialized: true
}))

app.set('port', process.env.PORT || PUERTO_SERVIDOR)

// Importación de rutas
import { usuarioRuta } from './routes/usuarios.js'
import { registroRuta } from './routes/registroRuta.js'
import { lobbyRuta } from './routes/lobbyRuta.js'
import { proyectosRuta } from './routes/proyectosRuta.js'
import { miCuentaRuta } from './routes/miCuentaRuta.js'
import { tiendaRuta } from './routes/tiendaRuta.js'
import { ayudaRuta } from './routes/ayudaRuta.js'
import { imagenRuta } from './routes/imagenRuta.js'
import { aplicacionRuta } from './routes/aplicacionRuta.js'
import { politicasRuta } from './routes/politicasRuta.js'
import { terminosRuta } from './routes/terminosRuta.js'
import { manualRuta } from './routes/manualRuta.js'

// Rutas
app.use('/login', usuarioRuta); 
app.use('/registro', registroRuta);
app.use('/lobby', lobbyRuta);
app.use('/proyectos', proyectosRuta);
app.use('/cuenta', miCuentaRuta);
app.use('/tienda', tiendaRuta);
app.use('/ayuda', ayudaRuta);
app.use('/imagen', imagenRuta);
app.use('/aplicacion', aplicacionRuta);
app.use('/imagenes', express.static(path.join(__dirname, '../Imagenes')));
app.use('/orbit', express.static(path.join(__dirname, '../node_modules/three/')));
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
}); 

//APIS
app.get('/config', (req, res) => {
    const config = {
        autorizado: true,
        nombreProyecto: NOMBRE_PROYECTO,
        versionProyecto: VERSION_PROYECTO
    }
    res.json(config); 
});

app.use('/politicas', politicasRuta);
app.use('/terminos', terminosRuta);
app.use('/manual', manualRuta);

app.listen(app.get('port'), ()=>{
    console.log('Server corriendo en puerto: ' + app.get('port') + ' en la versión: [' +  VERSION_PROYECTO + ']');
});