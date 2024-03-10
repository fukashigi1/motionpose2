import path from 'path'

export class politicasController {
    static async view (req, res) {
        res.sendFile(path.join(__dirname, '..', 'view', 'politicas.html'));
    }
}