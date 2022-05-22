import mySqlConnector from '../utils/mysql.connector';
import { Pool } from 'mysql';
import config from '@/config';

export default async (): Promise<Pool> => {
    return mySqlConnector.init(config.mySql);
}