const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'proyecto.html'));
    }
};

controller.obtenerProyectos = async (req, res) => {
    let msg;
    req.getConnection((error, conexion) => {
        if (error) {
            msg = "Ha ocurrido un error inesperado en la consulta getConnection.";
            console.error(msg);
            res.json({ Exito: false, msg: msg });
        } else {
            if (req.session.correo === undefined) {
                msg = "No se encuentra el correo en nuestra base de datos.";
                console.error(msg);
                res.json({ Exito: false, msg: msg });
            }else{
                conexion.query('SELECT * FROM proyectos WHERE correo = ?', [req.session.correo], (error, filas) => {
                console.log("correo");
                console.log(req.session.correo);
                if (error) {
                    msg = error.code;
                    console.error(msg);
                    res.json({ Exito: false, msg: msg });
                } else {
                    console.log("select");
                    console.log(filas);
                    res.json({ Exito: true, msg: "Proyectos obtenidos satisfactoriamente.", proyectos: filas});
                }
            });
            }
        }
    });
};

module.exports = controller;
