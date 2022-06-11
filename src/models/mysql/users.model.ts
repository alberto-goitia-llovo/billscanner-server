import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { INewUser } from '@/interfaces/users.interface';
import { fieldsFromArray, valuesFromArrayAndFields, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'user';

export default new class UsersModel {
    public async createNewUser(new_user_data: INewUser): Promise<any> {
        let statement = `INSERT INTO ${TABLE} (name, email, password, salt)\nVALUES${valuesFromArrayAndFields([new_user_data], ['name', 'email', 'password', 'salt'])}`;
        return await db.executeStatement<any>(statement);
    };

    public async findUser(email): Promise<any> {
        let query = `SELECT * FROM ${TABLE} WHERE email = '${email}' LIMIT 1`;
        const result = await db.executeStatement<any>(query);
        return result[0];
    }

    public async findUserById(user_id): Promise<any> {
        let query = `SELECT * FROM ${TABLE} WHERE _id = '${user_id}' LIMIT 1`;
        const result = await db.executeStatement<any>(query);
        return result[0];
    }
}