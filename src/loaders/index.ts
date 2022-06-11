import expressLoader from './express';
import mysqlLoader from './mysql.loader';
import Logger from '../services/logger.service';

export default async ({ expressApp }) => {
    await mysqlLoader();
    Logger.info('✌️ DB loaded and connected!');
    Logger.info('✌️ Dependency Injector loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};
