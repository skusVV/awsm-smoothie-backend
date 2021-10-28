import { Recipe } from '../models/recipi.model';

export class RecipeService {

    async getRecipeById(name: string) {
        return Recipe.findOne({ name });
    }
}