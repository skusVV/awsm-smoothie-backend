import { Response, Request } from 'express';
import { CategoryController } from '../controller/category';

const categoryController = new CategoryController();

export const categoryRoutes = (app: any) => {
    app.get('/api/category/:id', (req: Request, res: Response) => {
        return categoryController.getCategory(req, res);
    });

    app.get('/api/categories', (req: Request, res: Response) => {
        return categoryController.getCategories(req, res);
    });

    app.get('/api/main/categories', (req: Request, res: Response) => {
        return categoryController.getMainCategoriesInfo(req, res);
    });
}