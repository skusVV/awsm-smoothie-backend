import { Response, Request} from 'express';
import { RecipeService } from '../services/recipe.service';
import { CategoryService } from '../services/category.service';
import { mainCategories } from '../constants/main-categories';

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

        let categories = []

        if (query.section) {
            categories = await categoryService.getCategoriesByIds(
                this.getIdsBySection(query.section)
            );
        }

        if (query.limit) {
            categories = await categoryService.getRandomCategories(
                Number(query.limit)
            );
        }


        if(!categories || !categories.length) {
            return res.status(404).send('Categories not found');
        }

        return res.send(categories);
    }

    async getMainCategoriesInfo(req: Request, res: Response): Promise<any> {
        const result = await Promise.all(mainCategories.map(async (category: any) => {
            const count = await categoryService.getCategoryRecipeCount(category.category_id);
            return {...category, recipiesCount: count, link: `/${category.category_id}`};
        }));

        return res.send(result);
    }

    private getIdsBySection(section: string): string[] {
        if (section === '1') {
            return [
                // 'weight-gain-shakes',
                'best-protein-shakes-for-weight-loss','plant-based-protein-shake', 'best-casein-protein']
        }

        return ['fat-burning-smoothie', 'meal-replacement-shakes', 'anti-inflammatory-smoothie', 'smoothie-superfoods']
    }
}
