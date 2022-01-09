import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
    app.use('/test', route);

    route.get('/testdata', (req: Request, res: Response) => {
        return res.json({ data: { text: "this is some piece of data" } }).status(200);
    });
};