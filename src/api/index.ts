import { Router } from 'express';
import config from '@/config'

import auth from './routes/auth';
import test from './routes/test';
// import user from './routes/user';
// import agendash from './routes/agendash';

// guaranteed to get dependencies
export default () => {
    const app = Router();

    console.log('esto es el config.environment', config.environment)
    if (config.environment == 'development') {
        test(app);
    }

    auth(app);
    // user(app);
    // agendash(app);
    return app
}