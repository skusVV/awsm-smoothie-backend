import { Recipe } from '../models/recipi.model';
import {Category} from "../models/categories.model";

export class RecipeService {

    async getRecipeByName(name: string, projection = {}) {
        return Recipe.findOne({ name }, projection).lean();
    }

    async getRecipeisByAuthorId(author_id: string, projection = {}) {
        return Recipe.find({ author_id }, projection).lean();
    }

    async getRecipeisByReviewerId(reviewer_id: string, projection = {}) {
        return Recipe.find({ reviewer_id }, projection).lean();
    }

    async getRecipesByCategoryId(category_id: string, projection = {}) {
        return Recipe.find({ categories: { $elemMatch: { $eq: category_id } } }, projection).lean();
    }

    async getRecipesCountByCategoryId(category_id: string) {
        return Recipe.find({ categories: { $elemMatch: { $eq: category_id } } }).count();
    }

    async getRecipesByText(text: string) {
        return Recipe.find( { $text: { $search: text } } ).lean();
    }

    async getRecipesByTextMatch(text: string) {
        return Recipe.find( {title:  new RegExp(text, "gi") } ).lean();
    }

    async getRecipesByKeyBenefit(b: string) {
        return Recipe.find({ key_benefit: b }).lean();
    }

    async getRecipesByLabel(label_id: any): Promise<any> {
        return Recipe.find({ labels: { $elemMatch: { $eq: label_id } } }).lean();
    }

    async getAllRecipesName() {
        return Recipe.find({ }, {name: 1, _id: 0}).lean();
    }
}
