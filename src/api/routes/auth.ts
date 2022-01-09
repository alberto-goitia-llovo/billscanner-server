import { Router, Request, Response } from 'express';
// import middlewares from '../middlewares';
const route = Router();

//Borrar este comentario
export default (app: Router) => {
    app.use('/auth', route);
    route.get('', (req: Request, res: Response) => {
        return res.status(200).json('You are using the authentication API');
    });
    route.get('/signin', (req: Request, res: Response) => {
        console.log('req.query', req.query)
        return res.status(200).json({ token: "1234" });
    });
};