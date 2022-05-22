import { Document, Model } from 'mongoose';
import { IUser } from '@/interfaces/IUser';
import BillsModel from '@/models/mysql/bills.model';
import * as winston from 'winston';
declare global {
    namespace Express {
        export interface Request {
            currentUser: IUser & Document;
        }
    }

    namespace Models {
        export type UserModel = Model<IUser & Document>;
        export type Bills = typeof BillsModel;
    }

    namespace Utils {
        export type Logger = winston.Logger;
    }

}
