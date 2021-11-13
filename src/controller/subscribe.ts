import { Response, Request} from 'express';

export class SubscribeController {

    async subscribe(req: Request, res: Response): Promise<any> {
        console.log('SUBSCRIBE TO: ', req.body);
        return res.send();
    }
}