import path from 'path'

export class imagenController {
    static async view (req, res) {
        if(req.session.loggedin != true){
            res.redirect('/login');
            //res.sendFile(path.join(process.cwd(), 'src', 'view', 'imagen.html'));
        }else{
            res.sendFile(path.join(process.cwd(), 'src', 'view', 'imagen.html'));
        }
    }
}