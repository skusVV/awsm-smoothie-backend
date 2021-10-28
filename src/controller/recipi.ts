import { Response, Request} from 'express';
import { RecipeService } from '../services/recipe.service';

const recipeService = new RecipeService();

export class RecipiController {

    async getRecipe(req: Request, res: Response): Promise<any> {
        const params: any = req.params;
        const recipe = await recipeService.getRecipeById(params.id);

        return res.send(recipe);
    }
}