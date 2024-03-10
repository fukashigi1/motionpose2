import path from 'path'

export class terminosController {
    static async view (req, res) {
        res.sendFile(path.join(process.cwd(), 'src', 'view', 'terminos.html'));
    }
}