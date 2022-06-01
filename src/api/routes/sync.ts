import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import SyncService from '@/services/sync.service';
import middleware from '../middlewares'
const route = Router();

export default (app: Router) => {
    const syncService = Container.get(SyncService);
    app.use('/sync', route);

    route.get('/getSyncData', middleware.isAuth, middleware.attachCurrentUser, async (req: Request, res: Response) => {
        let data = await syncService.getUserData(req.currentUser._id)
        return res.status(200).json(data);
    });
};