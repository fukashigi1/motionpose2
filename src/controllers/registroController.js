const controller = {};
const path = require('path');
let usuariosLista = [];
let Exito;
function getUsuarios() {
    return usuariosLista;
}
function getExito(){
    return Exito;
}
controller.vista = (req, res)=>{
    req.getConnection((error, conexion) =>{
        conexion.query('SELECT * FROM usuarios', (error, filas) => {
            res.sendFile(path.join(__dirname, '..', 'view', 'registro.html'))
        });
    });
};
/*
controller.vista = (req, res)=>{
    req.getConnection((error, conexion) =>{
        conexion.query('SELECT * FROM usuarios', (error, filas) => {
            if(error){
                Exito = false;
            }else{
                //res.json(filas);
                usuariosLista = filas;
                //console.log(filas[1].);
                Exito = true;
            }
            //usuariosLista.unshift({ Exito });
            res.sendFile(path.join(__dirname, '..', 'view', 'login.html'))
        });
    });
};*/

module.exports = controller;
module.exports.getUsuarios = getUsuarios;
module.exports.getExito = getExito;
