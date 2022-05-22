import { Request } from 'express';

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

export interface IBillDTO extends Array<IBill> { };
