import { Response, Request} from 'express';
import { RecipeService } from '../services/recipe.service';
import { CategoryService } from '../services/category.service';

const recipeService = new RecipeService();
const categoryService = new CategoryService();

export class CategoryController {

    async getCategory(req: Request, res: Response): Promise<any> {
        const params: any = req.params;
        const category = await categoryService.getCategoryById(params.id);

        if(!category) {
            return res.status(404).send('Category not found');
        }

        const recipeCount = await recipeService.getRecipesCountByCategoryId(params.id);
        const bannerDescription = category.category_banner_description.replace('[count]', recipeCount.toString());

        return res.send({
            ...category,
            bannerDescription
        });
    }

    async getCategories(req: Request, res: Response): Promise<any> {
        const query: any = req.query;

        const categories = await categoryService.getCategoriesByIds(
            this.getIdsBySection(query.section)
        );

        if(!categories || !categories.length) {
            return res.status(404).send('Categories not found');
        }

        return res.send(categories);
    }

    private getIdsBySection(section: string): string[] {
        if (section === '1') {
            return ['weight-gain-shakes', 'weight-loss-shakes','plant-based-shakes', 'casein-protein-shakes']
        }

        return ['fat-burning-smoothies', 'meal-replacement-smoothies', 'anti-inflammatory-smoothies', 'superfood-smoothies']
    }
}