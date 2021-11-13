import { Response, Request} from 'express';
import { SubscribeController } from '../controller/subscribe';

const subscribeController = new SubscribeController();


export const subscribeRoutes = (app: any) => {
    app.post('/api/subscribe', (req: Request, res: Response) => {
        return subscribeController.subscribe(req, res);
    });
}