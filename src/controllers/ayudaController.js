import path from 'path'

export class ayudaController {
    static async view (req, view) {
        if(req.session.loggedin != true){
            res.redirect('/login');
            
            //res.sendFile(path.join(process.cwd(), 'src', 'view', 'ayuda.html'));
        }else{
            res.sendFile(path.join(process.cwd(), 'src', 'view', 'ayuda.html'));
        }
    }
}