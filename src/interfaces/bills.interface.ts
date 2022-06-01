export interface IBill {
    bill_id?: number,
    date: Date,
    concept: string,
    amount: number,
    balance: number | null,
    details: string | null,
    category_id: number,
    account_id: number,
    user_id: number,
};

export interface IBillDTO {
    date: Date,
    concept: string,
    amount: number,
    details: string | null,
    category_name: number,
    bill_type: string,
    account_name: string,
    user_id: number,
};
