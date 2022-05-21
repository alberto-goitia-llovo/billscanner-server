import db from '@/utils/mysql.connector';
import { IBill } from '@/interfaces/bills.interface';
const TABLE = 'bill';

export class Bills {
    public async getBills(user_id: string): Promise<IBill[]> {
        try {
            const query = `SELECT * FROM ${TABLE} WHERE user_id = ?`;
            const params = [user_id];
            const result = await db.executeStatement<IBill[]>(query, params);
            return result;
        } catch (error) {
            console.error('[mysql.bills.getBills][Error]: ', error);
            throw new Error('failed to get bills');
        }
    };

    public async updateBills(bills: IBill[]): Promise<IBill[]> {
        try {
            console.log('Updating bills');
            return bills;
        } catch (error) {
            console.error('[mysql.bills.updateBills][Error]: ', error);
            throw new Error('failed to update bills');
        }
    };
}