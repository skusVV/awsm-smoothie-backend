import { Recipe } from '../models/recipi.model';

export class RecipeService {

    async getRecipeByName(name: string, projection = {}) {
        return Recipe.findOne({ name }, projection).lean();
    }

    async getRecipeisByAuthorId(author_id: string, projection = {}) {
        return Recipe.find({ author_id }, projection).lean();
    }

    async getRecipesByCategoryId(category_id: string, projection = {}) {
        return Recipe.find({ categories: { $elemMatch: { $eq: category_id } } }, projection).lean();
    }

    async getRecipesCountByCategoryId(category_id: string) {
        return Recipe.find({ categories: { $elemMatch: { $eq: category_id } } }).count();
    }
}