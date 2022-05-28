import { keys } from 'ts-transformer-keys';
import db from '@/utils/mysql.connector';
import { INewUserCategoryDTO } from '@/interfaces/categories.interface';
import { fieldsFromArray, valuesFromArrayAndFields, updateOnDupString } from '@/utils/jsonToMySql';
const TABLE = 'category';

export default new class AccountModel {
    public async createNewUserCategory(category_data: INewUserCategoryDTO): Promise<any> {
        try {
            let params = keys<INewUserCategoryDTO>();
            let statement = `INSERT INTO ${TABLE} ${fieldsFromArray(params)}\nVALUES${valuesFromArrayAndFields([category_data], params)}`;
            return await db.executeStatement<any>(statement);
        } catch (error) {
            throw new Error('failed to create new account');
        }
    };

    public async findUserCategories(user_id): Promise<any> {
        try {
            let query = `SELECT * FROM ${TABLE} WHERE user_id = '${user_id}' OR user_id IS NULL`;;
            const result = await db.executeStatement<any>(query);
            return result;
        } catch (error) {
            throw new Error('failed to find user accounts');
        }
    }

    public async deleteUserCategory(user_id, category_id): Promise<any> {
        try {
            let query = `DELETE FROM ${TABLE} WHERE _id = '${category_id}' AND user_id = '${user_id}'`;
            return await db.executeStatement<any>(query);
        } catch (error) {
            throw new Error('failed to delete account');
        }
    }
}