import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { IBill } from '@/interfaces/bills.interface';
import { fieldsFromArray, valuesFromArrayAndFields, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'bill';

export default new class BillsModel {
    public async findUserBills(user_id: number | null): Promise<IBill[] | []> {
        try {
            let query = user_id ? `SELECT * FROM ${TABLE} WHERE user_id = ${user_id}` : `SELECT * FROM ${TABLE}`;
            const result = await db.executeStatement<any>(query);
            return result;
        } catch (error) {
            console.error('[mysql.bills.getBills][Error]: ', error);
            throw new Error('failed to get bills');
        }
    };

    public async upsertBills(bills: IBill[]): Promise<IBill[]> {
        try {
            let params = keys<IBill>();
            console.log('params', params)
            let query = `
            INSERT INTO ${TABLE} ${fieldsFromArray(params)}
            VALUES
            ${valuesFromArrayAndFields(bills, params)}
            ON DUPLICATE KEY UPDATE
            ${updateOnDupString(params)};
            `
            console.log('query', query)
            // const result = await db.executeStatement<any>(query);
            // console.log('result', result)
            return;
            return bills;
        } catch (error) {
            console.error('[mysql.bills.updateBills][Error]: ', error);
            throw new Error('failed to update bills');
        }
    };
}