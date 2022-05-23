import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import mysqlLoader from './mysql.loader';
// import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
// import './events';

export default async ({ expressApp }) => {
    // const mongoConnection = await mongooseLoader();
    await mysqlLoader();
    Logger.info('✌️ DB loaded and connected!');

    await dependencyInjectorLoader({
        models: [
            { name: 'userModel', model: require('../models/mysql/user.model').default },
            { name: 'billsModel', model: require('../models/mysql/bills.model').default },
        ],
    });
    Logger.info('✌️ Dependency Injector loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};
