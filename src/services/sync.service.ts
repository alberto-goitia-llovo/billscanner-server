import BillsModel from '@/models/mysql/bills.model';
import AccountsModel from '@/models/mysql/accounts.model';
import CategoriesModel from '@/models/mysql/categories.model';
import Logger from '@/services/logger.service';
export default new class SyncService {

    public async getUserData(user_id: number): Promise<any> {
        let promises = [];
        //TODO: it's more efficient to get all at once in the same query using JOINS
        promises.push(BillsModel.findUserBills(user_id));
        promises.push(AccountsModel.findUserAccounts(user_id));
        promises.push(CategoriesModel.findUserCategories(user_id));
        let data = await Promise.all(promises);
        return {
            bills: data[0],
            accounts: data[1],
            categories: data[2]
        }
    }
}
