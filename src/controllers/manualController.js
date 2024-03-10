import path from 'path'

export class manualController {
    static async view (req, res) {
        res.sendFile(path.join(__dirname, '..', 'view', 'manual.html'));
    }
}