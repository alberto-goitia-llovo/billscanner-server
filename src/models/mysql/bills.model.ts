import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { IBill, IBillDTO } from '@/interfaces/bills.interface';
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

    public async upsertBills(user_id: number, bills: IBillDTO[]): Promise<IBill[]> {
        try {
            let VALUES = '';
            for (let bill of bills) {
                let account_id = `SELECT account_id FROM account WHERE name = '${bill.account_name}' AND user_id = ${user_id}`;
                let category_id = `SELECT category_id FROM category WHERE name = '${bill.category_name}' AND type = '${bill.bill_type}' AND user_id = ${user_id}`;
                let values = `(
                    ${bill.date},
                    ${bill.concept},
                    ${bill.amount},
                    ${bill.details},
                    ${category_id},
                    ${account_id},
                    ${bill.user_id},
                ),\n`;
                VALUES += values;
            }
            let query = `
            INSERT INTO ${TABLE} ('date', 'concept', 'amount', 'details', 'category_id', 'account_id', 'user_id')
            VALUES
            ${VALUES}
            ON DUPLICATE KEY UPDATE
            ${updateOnDupString(['date', 'concept', 'amount', 'details', 'category_id', 'account_id', 'user_id'])};
            `
            console.log('query', query)
            // const result = await db.executeStatement<any>(query);
            // console.log('result', result)
            return;
            // return bills;
        } catch (error) {
            console.error('[mysql.bills.updateBills][Error]: ', error);
            throw new Error('failed to update bills');
        }
    };
}