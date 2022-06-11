import { Router } from 'express';
import config from '@/config'

import auth from './routes/auth.route';
import test from './routes/test.route';
import bills from './routes/bills.route';
import sync from './routes/sync.route';
import accounts from './routes/accounts.route';

// guaranteed to get dependencies
export default () => {
    const app = Router();

    if (config.environment == 'development') {
        test(app);
    }

    auth(app);
    bills(app);
    sync(app);
    accounts(app);
    return app
}