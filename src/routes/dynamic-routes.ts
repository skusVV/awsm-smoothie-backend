// dynamic-routes

import { Response, Request} from 'express';
import { CategoryService } from '../services/category.service';
import { RecipeService } from '../services/recipe.service';

const categoryService = new CategoryService();
const recipeService = new RecipeService();


export const dynamicRoutes = (app: any) => {
    app.get('/api/dynamic-routes', async (req: Request, res: Response) => {
        const categoryNames = await categoryService.getAllCategoriesName();
        const recipeNames = await recipeService.getAllRecipesName();

        return res.send({
            categories: categoryNames.map(item => item.category_id),
            recipes: recipeNames.map(item => item.name)
        });
    });
}