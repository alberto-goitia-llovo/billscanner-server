import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { INewUser } from '@/interfaces/user.interface';
import { bracketsToParenthesis, arrayString, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'user';

export default new class BillsModel {
    public async createNewUser(new_user_data: INewUser): Promise<any> {
        try {
            let params = keys<INewUser>();
            let statement = `
            INSERT INTO ${TABLE} (${params})
            VALUES
            ${arrayString(new_user_data, params)}
            `;
            console.log('statement', statement)
            return;
            const result = await db.executeStatement<any>(statement);
            return result;
        } catch (error) {
            console.error('[mysql.bills.getBills][Error]: ', error);
            throw new Error('failed to get bills');
        }
    };

    public async findOne(email: string): Promise<any> {
        try {
            let query = `SELECT * FROM ${TABLE} WHERE email = '${email}'`;
            const result = await db.executeStatement<any>(query);
            return result;
        } catch (error) {
            console.error('[mysql.bills.getBills][Error]: ', error);
            throw new Error('failed to get bills');
        }
    }
}