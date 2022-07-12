import { Response, Request} from 'express';
import { SearchController } from '../controller/search';

const searchController = new SearchController();

export const searchRoutes = (app: any) => {
    app.get('/api/search', (req: Request, res: Response) => {
        return searchController.search(req, res);
    });
    app.get('/api/suggest', (req: Request, res: Response) => {
        return searchController.searchSuggest(req, res);
    });
}
