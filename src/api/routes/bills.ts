import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import BillsService from '@/services/bills.service';
import middleware from '../middlewares'
const route = Router();

export default (app: Router) => {

    app.use('/bills', route);

    route.post('/upload', async (req: Request, res: Response) => {
        const billsService = Container.get(BillsService);
        await billsService.upsertBills(req.body.bills)
        return res.status(200).json("TODO OK");
    });

    route.post('/findAll', async (req: Request, res: Response) => {
        const billsService = Container.get(BillsService);

        await billsService.findAllBills(null)
        return res.status(200).json("TODO OK");
    });
};