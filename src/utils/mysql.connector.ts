import { createPool, Pool } from 'mysql';
import config from '@/config';
const dataSource = config.mySqlDataSource;

export default new class MySqlConnector {
    private pool: Pool;

    constructor() { }

    public async init(): Promise<Pool> {
        try {
            this.pool = createPool({
                connectionLimit: dataSource.DB_CONNECTION_LIMIT,
                host: dataSource.DB_HOST,
                user: dataSource.DB_USER,
                password: dataSource.DB_PASSWORD,
                database: dataSource.DB_DATABASE,
            });

            console.debug('MySql Adapter Pool generated successfully');
            return this.pool;
        } catch (error) {
            console.log('error', error)
            throw new Error('failed to initialized pool')
        }
    };
    public async executeStatement<T>(query: string, params: string[] | Object): Promise<T> {
        try {
            if (!this.pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
            return new Promise<T>((resolve, reject) => {
                this.pool.query(query, params, (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                });
            });
        } catch (error) {
            console.error('[mysql.connector][execute][Error]: ', error);
            throw new Error('failed to execute MySQL query');
        }
    };
}