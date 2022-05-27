import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { INewUser } from '@/interfaces/user.interface';
import { bracketsToParenthesis, arrayString, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'user';

export default new class UserModel {
    public async createNewUser(new_user_data: INewUser): Promise<any> {
        try {
            let params = keys<INewUser>();
            let statement = `INSERT INTO ${TABLE} (${params})\nVALUES${arrayString([new_user_data], params)}`;
            return await db.executeStatement<any>(statement);
        } catch (error) {
            console.error('[mysql.bills.getBills][Error]: ', error);
            throw new Error('failed to get bills');
        }
    };

    public async findUser(email): Promise<any> {
        try {
            let query = `SELECT * FROM ${TABLE} WHERE email = '${email}' LIMIT 1`;
            const result = await db.executeStatement<any>(query);
            return result[0];
        } catch (error) {
            console.error('[mysql.bills.getBills][Error]: ', error);
            throw new Error('failed to get bills');
        }
    }
}