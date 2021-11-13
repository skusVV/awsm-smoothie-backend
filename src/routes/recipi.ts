import { Response, Request} from 'express';
import { RecipeController } from '../controller/recipi';

const recipeController = new RecipeController();


export const recipeRoutes = (app: any) => {
    app.get('/api/recipe/:id', (req: Request, res: Response) => {
        return recipeController.getRecipe(req, res);
    });
}