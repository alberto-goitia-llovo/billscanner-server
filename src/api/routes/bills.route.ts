import { Router, Request, Response } from 'express';
import BillsService from '@/services/bills.service';
import middleware from '../middlewares'
import { celebrate, Joi, errors } from 'celebrate';
const route = Router();

export default (app: Router) => {
    app.use('/bills', route);

    route.post('/upload', middleware.isAuth, middleware.attachCurrentUser,
        celebrate({
            body: Joi.object({
                bills: Joi.array().items(Joi.object({
                    date: Joi.string().required(),
                    concept: Joi.string().allow('').required(),
                    account: Joi.string().required(),
                    category: Joi.string(),
                    details: Joi.string().allow('').required(),
                    amount: Joi.number().required(),
                    bill_type: Joi.string().required(),
                })),
            })
        }),
        async (req: Request, res: Response) => {
            await BillsService.upsertBills(req.currentUser._id, req.body.bills)
            return res.status(200).json("TODO OK");
        });

    route.post('/findAll', async (req: Request, res: Response) => {
        await BillsService.findAllBills(null)
        return res.status(200).json("TODO OK");
    });


};

