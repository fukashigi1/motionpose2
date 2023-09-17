const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'miCuenta.html'));
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'miCuenta.html'));
    }
};

controller.salir = async (req, res) => {
    if(req.session.loggedin == true){
        req.session.destroy();
    }
    res.redirect('/login');
}

module.exports = controller;
