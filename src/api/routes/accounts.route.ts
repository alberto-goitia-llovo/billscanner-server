import { Router, Request, Response } from 'express';
import AccountsService from '@/services/accounts.service';
import middleware from '../middlewares';
import { celebrate, Joi } from 'celebrate';
const route = Router();

export default (app: Router) => {
    app.use('/accounts', route);

    route.post('/create', middleware.isAuth, middleware.attachCurrentUser,
        celebrate({
            body: Joi.object({
                new_accounts: Joi.array().items(Joi.string()).required(),
            })
        }),
        async (req: Request, res: Response) => {
            await AccountsService.createNewAccounts(req.currentUser._id, req.body.new_accounts)
            return res.status(200).json();
        });
};