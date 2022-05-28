import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { INewUser } from '@/interfaces/users.interface';
import { fieldsFromArray, valuesFromArrayAndFields, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'account';

export default new class AccountModel {
    public async createNewAccount(user_id, name): Promise<any> {
        try {
            let statement = `INSERT INTO ${TABLE} (user_id, name)\nVALUES\n(${user_id}, ${name})`;
            return await db.executeStatement<any>(statement);
        } catch (error) {
            throw new Error('failed to create new account');
        }
    };

    public async findUserAccounts(user_id): Promise<any> {
        try {
            let query = `SELECT * FROM ${TABLE} WHERE user_id = '${user_id}'`;
            const result = await db.executeStatement<any>(query);
            return result;
        } catch (error) {
            throw new Error('failed to find user accounts');
        }
    }

    public async deleteAccount(account_id): Promise<any> {
        try {
            let query = `DELETE FROM ${TABLE} WHERE _id = '${account_id}'`;
            return await db.executeStatement<any>(query);
        } catch (error) {
            throw new Error('failed to delete account');
        }
    }
}