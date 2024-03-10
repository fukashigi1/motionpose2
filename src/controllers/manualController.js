import path from 'path'

export class manualController {
    static async view (req, res) {
        res.sendFile(path.join(process.cwd(), 'src', 'view', 'manual.html'));
    }
}