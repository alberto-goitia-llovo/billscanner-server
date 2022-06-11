import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { INewUser } from '@/interfaces/users.interface';
import { fieldsFromArray, valuesFromArrayAndFields, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'account';

export default new class AccountModel {
    public async createNewAccounts(user_id, names: string[]): Promise<any> {
        let VALUES = `\nVALUES`;
        for (let i = 0; i < names.length; i++) {
            VALUES += `\n('${user_id}', '${names[i]}')`;
            if (i < names.length - 1) VALUES += `,`;
        }
        let statement = `INSERT INTO ${TABLE} (user_id, name)${VALUES};`;
        console.log('statement', statement)
        return db.executeStatement<any>(statement);
    };

    public async findUserAccounts(user_id): Promise<any> {
        let query = `SELECT * FROM ${TABLE} WHERE user_id = '${user_id}'`;
        return db.executeStatement<any>(query);
    }

    public async deleteAccount(account_id): Promise<any> {
        let query = `DELETE FROM ${TABLE} WHERE _id = '${account_id}'`;
        return db.executeStatement<any>(query);
    }
}