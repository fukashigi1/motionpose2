import path from 'path'

export class politicasController {
    static async view (req, res) {
        res.sendFile(path.join(process.cwd(), 'src', 'view', 'politicas.html'));
    }
}