import { Router } from 'express';
import config from '@/config'

import auth from './routes/auth';
import test from './routes/test';
import bills from './routes/bills';
// import user from './routes/user';
// import agendash from './routes/agendash';

// guaranteed to get dependencies
export default () => {
    const app = Router();

    if (config.environment == 'development') {
        test(app);
    }

    auth(app);
    bills(app);
    // user(app);
    // agendash(app);
    return app
}