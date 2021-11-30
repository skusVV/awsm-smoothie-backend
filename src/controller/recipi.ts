import { Response, Request} from 'express';
import { RecipeService } from '../services/recipe.service';
import { AuthorService } from '../services/author.service';
import { LabelService } from '../services/label.service';
import { IngredientService } from '../services/ingredient.service';

const recipeService = new RecipeService();
const authorService = new AuthorService();
const labelService = new LabelService();
const ingredientService = new IngredientService();

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
        const originalIngredients = await ingredientService
            .getIngredientsByIds(recipe.ingredients.map(item => item.ingredient_id));
        recipe.ingredients = this.mergeIngredients(recipe.ingredients, originalIngredients);

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
        // const ingredients = await ingredientService.getAllIngredients();

        return res.send(recipes.map(recipe => {

            return {
                ...recipe,
                labels: this.getLabels(recipe.labels, labels),
                // ingredients: this.mergeIngredients(recipe.ingredients, ingredients)
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

    private mergeIngredients(recipeIngredients: any[], originalIngredients: any[]): any[] {
        return recipeIngredients.map(item => {
            const original = originalIngredients.find(el => item.ingredient_id === el.ingredient_id);

            if(!original) {
                return null
            }

            return { title: original.name, info: item.info, imgUrl: original.img };
        }).filter(Boolean);
    }
}