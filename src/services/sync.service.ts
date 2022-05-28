import 'reflect-metadata'; // We need this in order to use @Decorators
import { Service, Inject } from 'typedi';

@Service()
export default class SyncService {
    constructor(
        @Inject('billsModel') private billsModel: Models.Bills,
        @Inject('accountsModel') private accountsModel: Models.Accounts,
        @Inject('categoriesModel') private categoriesModel: Models.Categories,
        @Inject('logger') private logger: Utils.Logger,
    ) {
    }

    public async getUserData(user_id: number): Promise<any> {
        let promises = [];
        //TODO: it's more efficient to get all at once in the same query using JOINS
        promises.push(this.billsModel.findUserBills(user_id));
        promises.push(this.accountsModel.findUserAccounts(user_id));
        promises.push(this.categoriesModel.findUserCategories(user_id));
        let data = await Promise.all(promises);
        return {
            bills: data[0],
            accounts: data[1],
            categories: data[2]
        }
    }
}
