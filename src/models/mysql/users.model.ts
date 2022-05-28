import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { INewUser } from '@/interfaces/users.interface';
import { fieldsFromArray, valuesFromArrayAndFields, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'user';

export default new class UsersModel {
    public async createNewUser(new_user_data: INewUser): Promise<any> {
        try {
            let params = keys<INewUser>();
            let statement = `INSERT INTO ${TABLE} (${params})\nVALUES${valuesFromArrayAndFields([new_user_data], params)}`;
            return await db.executeStatement<any>(statement);
        } catch (error) {
            throw new Error('failed to create new user');
        }
    };

    public async findUser(email): Promise<any> {
        try {
            let query = `SELECT * FROM ${TABLE} WHERE email = '${email}' LIMIT 1`;
            const result = await db.executeStatement<any>(query);
            return result[0];
        } catch (error) {
            throw new Error('failed to find user');
        }
    }

    public async findUserById(user_id): Promise<any> {
        try {
            let query = `SELECT * FROM ${TABLE} WHERE _id = '${user_id}' LIMIT 1`;
            const result = await db.executeStatement<any>(query);
            return result[0];
        } catch (error) {
            throw new Error('failed to find user');
        }
    }
}