import path from 'path'

export class terminosController {
    static async view (req, res) {
        res.sendFile(path.join(__dirname, '..', 'view', 'terminos.html'));
    }
}