import 'reflect-metadata'; // We need this in order to use @Decorators
import { Service, Inject } from 'typedi';
import { IBillDTO, IBill } from '@/interfaces/bills.interface';
import BillsModel from '@/models/mysql/bills.model';

export default new class BillsService {

    public async findAllBills(user_id: number | null): Promise<IBill[] | []> {
        return BillsModel.findUserBills(user_id);
    }

    public async upsertBills(user_id: number, bills: IBillDTO[]): Promise<IBill[] | []> {
        console.log('bills', bills)
        return BillsModel.upsertBills(user_id, bills);
    }
}
