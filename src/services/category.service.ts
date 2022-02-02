import { Category } from '../models/categories.model';
import { Recipe } from '../models/recipi.model';

export class CategoryService {

    async getCategoryById(category_id: string = '', projection = {}) {
        return Category.findOne({ category_id }, projection).lean();
    }

    async getAllCategoriesName() {
        return Category.find({ }, {category_id: 1, _id: 0}).lean();
    }

    async getCategoriesByIds(ids: string[]) {
        return Category.find({ category_id: { $in: ids} }, { _id: 0}).lean();
    }

    async getRandomCategories(limit: number) {
        return Category.aggregate([
            { $sample: { size: limit } }
        ]).exec();
    }

    async getCategoryRecipeCount(categoryId: string) {
        return Recipe.find( { categories: { $elemMatch: { $eq: categoryId} } }).count();
    }
}