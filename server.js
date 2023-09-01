const express = require('express');
const path = require("path");

const app = express();
app.set('port', process.env.PORT || 5555);

app.use(express.static('public'));
app.use('/css_local', express.static(__dirname + 'public/css_local'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

app.get('/', (req, res)=>{
    //res.send('Bienvenido a la api');
    res.sendFile(path.join(__dirname, 'view', 'index.html'))
});

app.get('/about', (req, res)=>{
    //res.send('Bienvenido a la api');
    res.sendFile(path.join(__dirname, 'view', 'about.html'))
});

app.listen(app.get('port'), ()=>{
    console.log('Server corriendo en puerto: ' + app.get('port'));
});