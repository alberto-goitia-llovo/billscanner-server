import { Router, Request, Response } from 'express';
import middleware from '../middlewares'
const route = Router();

export default (app: Router) => {
    app.use('/bills', route);

    route.post('/upload', (req: Request, res: Response) => {
        console.log('req.body', req.body);
        //TODO: save to billscolecction
        return res.status(200).json("TODO OK");
    });
};