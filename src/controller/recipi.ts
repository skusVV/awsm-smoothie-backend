import { Response, Request} from 'express';
import { RecipeService } from '../services/recipe.service';
import { AuthorService } from '../services/author.service';

const recipeService = new RecipeService();
const authorService = new AuthorService();

export class RecipeController {

    async getRecipe(req: Request, res: Response): Promise<any> {
        const params: any = req.params;
        const recipe = await recipeService.getRecipeByName(params.id);
        const author = await authorService.getAuthorByName(recipe?.author_id, { name: 1, imageUrl: 1, author_id: 1 });

        if (!recipe) {
            return res.send(null);
        }

        return res.send({
            ...recipe,
            authorName: author?.name,
            authorImageUrl: author?.imageUrl,
            authorLink: `/author/${author?.author_id}`
        });
    }
}