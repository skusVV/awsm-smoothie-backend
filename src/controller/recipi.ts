import { Response, Request} from 'express';
import { RecipeService } from '../services/recipe.service';
import { AuthorService } from '../services/author.service';
import { LabelService } from '../services/label.service';

const recipeService = new RecipeService();
const authorService = new AuthorService();
const labelService = new LabelService();

export class RecipeController {

    async getRecipe(req: Request, res: Response): Promise<any> {
        const params: any = req.params;
        const recipe = await recipeService.getRecipeByName(params.id);

        if (!recipe) {
            return res.send(null);
        }

        const author = await authorService.getAuthorByName(recipe?.author_id, { name: 1, imageUrl: 1, author_id: 1 });
        const labels = await labelService.getAllLabels();
        recipe.labels = this.getLabels(recipe.labels, labels);

        return res.send({
            ...recipe,
            authorName: author?.name,
            authorImageUrl: author?.imageUrl,
            authorLink: `/author/${author?.author_id}`
        });
    }

    async getAllRecipesCategoryId(req: Request, res: Response): Promise<any> {
        const params: any = req.params;
        const recipes = await recipeService.getRecipesByCategoryId(params.id);

        if (!recipes || !recipes.length) {
            return res.send([]);
        }

        const labels = await labelService.getAllLabels();

        return res.send(recipes.map(recipe => {
            return {
                ...recipe,
                labels: this.getLabels(recipe.labels, labels)
            }
        }));
    }

    private getLabels(recipeLabels: string[], labels: any[]): string[] {
        return recipeLabels
            .map(recipeLabel => {
                    const currentLabel = labels.find(label => label.label_id === recipeLabel);
                    return currentLabel && currentLabel.text? currentLabel.text : '';
                }
            )
            .filter(Boolean);
    }
}