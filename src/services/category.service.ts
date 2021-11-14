import { Category } from '../models/categories.model';

export class CategoryService {

    async getCategoryById(category_id: string = '', projection = {}) {
        return Category.findOne({ category_id }, projection).lean();
    }

    async getRandomCategories(limit: number) {
        // return Category.findOne({ }, projection).lean();
        return Category.aggregate([
            { $sample: { size: limit } }
        ])
    }
}