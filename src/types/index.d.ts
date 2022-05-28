import { Document, Model } from 'mongoose';
import { IUser } from '@/interfaces/users.interface';
import BillsModel from '@/models/mysql/bills.model';
import UsersModel from '@/models/mysql/users.model';
import AccountsModel from '@/models/mysql/accounts.model';
import CategoriesModel from '@/models/mysql/categories.model';
import * as winston from 'winston';
declare global {
    namespace Express {
        export interface Request {
            currentUser: IUser;
        }
    }

    namespace Models {
        export type UsersModel = typeof UsersModel;
        export type Bills = typeof BillsModel;
        export type Accounts = typeof AccountsModel;
        export type Categories = typeof CategoriesModel;
    }

    namespace Utils {
        export type Logger = winston.Logger;
    }

}
