const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        //res.redirect('/login');
        res.sendFile(path.join(__dirname, '..', 'view', 'tienda.html'));
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'tienda.html'));
    }
};
controller.datos = async (req, res)=>{
    res.json({datos: req.session});
};

controller.salir = async (req, res) => {
    if(req.session.loggedin == true){
        req.session.destroy();
    }
    res.redirect('/login');
}

module.exports = controller;
