import { createPool, Pool } from 'mysql';


export default new class MySqlConnector {
    private pool: Pool;

    constructor() { }

    public async init(mySqlConfig): Promise<Pool> {
        try {
            this.pool = createPool({
                connectionLimit: mySqlConfig.DB_CONNECTION_LIMIT,
                host: mySqlConfig.DB_HOST,
                user: mySqlConfig.DB_USER,
                password: mySqlConfig.DB_PASSWORD,
                database: mySqlConfig.DB_DATABASE,
            });

            return this.pool;
        } catch (error) {
            throw new Error('failed to initialized pool')
        }
    };
    public async executeStatement<T>(query: string, params: string[] | Object | null = null): Promise<T> {
        try {
            if (!this.pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
            return new Promise<T>((resolve, reject) => {
                this.pool.query(query, params, (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                });
            });
        } catch (error) {
            throw new Error('failed to execute MySQL query');
        }
    };
}