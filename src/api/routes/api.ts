import { Router, Request, Response } from 'express';
// import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
    app.use('/api', route);

    route.get('', (req: Request, res: Response) => {
        return res.json({ message: "Estas usando la api, si, campeón" }).status(200);
    });
};