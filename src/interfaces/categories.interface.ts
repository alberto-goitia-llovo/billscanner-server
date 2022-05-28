export interface ICategory {
    _id?: number,
    name: string,
    type: 'income' | 'expense' | 'repayment' | 'transfer',
    user_id?: number,
    created_at?: Date,
    updated_at?: Date,
};

export interface INewUserCategoryDTO {
    name: string,
    type: 'income' | 'expense' | 'repayment' | 'transfer',
    user_id: number
}