const controller = {};
const path = require('path');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        res.redirect('/login');
        
        //res.sendFile(path.join(__dirname, '..', 'view', 'ayuda.html'));
    }else{
        res.sendFile(path.join(__dirname, '..', 'view', 'ayuda.html'));
    }
};

module.exports = controller;
