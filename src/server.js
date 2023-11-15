const express = require('express');
const morgan = require('morgan');
const path = require("path");
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
const compression = require('compression');
require('dotenv').config({ path: 'config.env' });
const session = require('express-session');

// Configuración de acceso a la base de datos
const URLBD = process.env.CONEXION_BASEDATOS_URLBD;
const USUARIOBD = process.env.CONEXION_BASEDATOS_USUARIOBD;
const CONTRASENABD = process.env.CONEXION_BASEDATOS_CONTRASENABD;
const PUERTOBD = process.env.CONEXION_BASEDATOS_PUERTOBD;
const NOMBREBD = process.env.CONEXION_BASEDATOS_NOMBREBD;

const URL_BASE = process.env.URL_BASE;

const PUERTO_SERVIDOR = process.env.PUERTO_SERVIDOR;
const NOMBRE_PROYECTO = process.env.NOMBRE_PROYECTO;
const VERSION_PROYECTO = process.env.VERSION_PROYECTO;
// Middlewares
app.use(compression());

app.use(morgan('dev'));

// Middleware para deshabilitar la caché
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});

app.use(myConnection(mysql, {
    host: URLBD,
    user: USUARIOBD,
    password: CONTRASENABD,
    port: PUERTOBD,
    database: NOMBREBD
}, 'single'));

app.use(session({
    secret: 'secret',
    saveUninitialized: true
}))

app.set('port', process.env.PORT || PUERTO_SERVIDOR);

app.use(express.static('public', {
    maxAge: 31536000, // Cache for 1 year
  }));
  
// Importación de rutas
const usuarioRuta = require('./routes/usuarios');
const registroRuta = require('./routes/registroRuta');
const lobbyRuta = require('./routes/lobbyRuta');
const proyectosRuta = require('./routes/proyectosRuta');
const miCuentaRuta = require('./routes/miCuentaRuta');
const tiendaRuta = require('./routes/tiendaRuta');
const ayudaRuta = require('./routes/ayudaRuta');
const imagenRuta = require('./routes/imagenRuta');
const aplicacionRuta = require('./routes/aplicacionRuta');
const politicasRuta = require('./routes/politicasRuta');
const terminosRuta = require('./routes/terminosRuta');
const manualRuta = require('./routes/manualRuta');

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