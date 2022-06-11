import db from '@/utils/mysql.connector';
import { IBill, IBillDTO } from '@/interfaces/bills.interface';
import { fieldsFromArray, valuesFromArrayAndFields, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'bill';

export default new class BillsModel {
    public async findUserBills(user_id: number | null): Promise<IBill[] | []> {
        let query = user_id ? `SELECT * FROM ${TABLE} WHERE user_id = ${user_id}` : `SELECT * FROM ${TABLE}`;
        const result = await db.executeStatement<any>(query);
        return result;
    };

    public async upsertBills(user_id: number, bills: IBillDTO[]): Promise<any> {
        let VALUES = '';
        for (let i = 0; i < bills.length; i++) {
            let bill = bills[i];
            let category_id = `SELECT _id FROM category WHERE name = '${bill.category}' AND type = '${bill.bill_type}' AND (user_id = ${user_id} OR user_id IS NULL)`;
            let account_id = `SELECT _id FROM account WHERE name = '${bill.account}' AND user_id = ${user_id}`;
            let values = `\n('${bill.date}','${bill.concept}','${bill.amount}','${bill.details}',(${category_id}),(${account_id}),'${user_id}')`;
            if (i < bills.length - 1) values += `,`;
            VALUES += values;
        }
        let query = `
            \rINSERT INTO ${TABLE} (date, concept, amount, details, category_id, account_id, user_id)
            \rVALUES${VALUES}
            \rON DUPLICATE KEY UPDATE${updateOnDupString(['date', 'concept', 'amount', 'details', 'category_id', 'account_id', 'user_id'])};
            `
        return db.executeStatement<any>(query);
    };
}