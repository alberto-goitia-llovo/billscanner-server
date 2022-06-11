import AccountsModel from '@/models/mysql/accounts.model'
export default new class AccountsService {

    public async createNewAccounts(user_id: number | null, new_accounts: string[]): Promise<any> {
        return AccountsModel.createNewAccounts(user_id, new_accounts);
    }
}
