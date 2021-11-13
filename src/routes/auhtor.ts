import { Response, Request } from 'express';
import { AuthorController } from '../controller/author';

const authorController = new AuthorController();


export const authorRoutes = (app: any) => {
    app.get('/api/author/:id', (req: Request, res: Response) => {
        return authorController.getAuthor(req, res);
    });
}