import { Router, Request, Response } from 'express';
import middleware from '../middlewares'
const route = Router();

export default (app: Router) => {
    app.use('/test', route);

    route.get('/testdata', (req: Request, res: Response) => {
        return res.status(200).json("This is some piece of data");
    });
};