const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        res.redirect('/login');
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'lobby.html'));
    }
};
controller.name = async (req, res)=>{
    res.json({name: req.session.name});
};

controller.salir = async (req, res) => {
    if(req.session.loggedin == true){
        req.session.destroy();
    }
    res.redirect('/login');
}

module.exports = controller;
