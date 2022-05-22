import 'reflect-metadata'; // We need this in order to use @Decorators
import { Service, Inject } from 'typedi';
import { IBill } from '@/interfaces/bills.interface';

@Service()
export default class BillsService {
    constructor(
        @Inject('billsModel') private billsModel: Models.Bills,
        @Inject('logger') private logger: Utils.Logger,
    ) {
    }

    public async findAllBills(user_id: number | null): Promise<IBill[] | []> {
        return this.billsModel.findAllBills(user_id);
    }

    public async upsertBills(bills: IBill[]): Promise<IBill[] | []> {
        return this.billsModel.upsertBills(bills);
    }
}
