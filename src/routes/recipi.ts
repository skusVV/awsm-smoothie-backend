import { Response, Request} from 'express';
import { RecipiController } from '../controller/recipi';

const recipiController = new RecipiController();


export const recipiRoutes = (app: any) => {
    app.get('/api/recipe/:id', (req: Request, res: Response) => {
        return recipiController.getRecipe(req, res);
    });
}