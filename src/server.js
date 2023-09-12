const express = require('express');
const morgan = require('morgan');
const path = require("path");
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
const compression = require('compression');

// Configuración
app.set('port', process.env.PORT || 5555);

app.use(express.static('public', {
    maxAge: 31536000, // Cache for 1 year
  }));
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'view', 'index.html'))
}); 
// Importación de rutas
const usuarioRuta = require('./routes/usuarios');
const registroRuta = require('./routes/registroRuta');

// Rutas
app.use('/login', usuarioRuta); 
app.use('/registro', registroRuta);

// Configuración de acceso a la base de datos
const hostDB = "localhost";
const userDB = "root";
const passwordDB = "";
const portDB = 3306;
const databaseDB = 'motionpose';

// Middlewares
app.use(compression());
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: hostDB,
    user: userDB,
    password: passwordDB,
    port: portDB,
    database: databaseDB
}, 'single'));

app.listen(app.get('port'), ()=>{
    console.log('Server corriendo en puerto: ' + app.get('port'));
});