const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
};
controller.post = async (req, res) => {
    let Exito;
    let correo = req.body.correo;
    let contrasena =  req.body.contrasena;
    let msg;
    req.getConnection((error, conexion) =>{
        if(error) {
            Exito = false;
            msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
            console.error(msg);
            res.json({Exito: Exito, msg: msg});
        }else {
            conexion.query('SELECT correo, contrasena FROM usuarios', (error, filas) => {
                if(error){
                    Exito = false;
                    msg = error.code;
                    console.error(msg);
                }else{
                    for (let i = 0; i < filas.length; i++){
                        if (filas[i].correo == correo && filas[i].contrasena == contrasena){
                            console.log("Correo: " + filas[i].correo + " - Contrasena: " + filas[i].contrasena);
                            msg = "Iniciando sesión...";
                            Exito = true;
                        }
                    }
                }
                res.json({Exito: Exito, msg: msg, correo: correo, contrasena: contrasena});
            });
        }
    });
    console.log(Exito);
}

module.exports = controller;
