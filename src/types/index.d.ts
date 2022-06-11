import { IUser } from '@/interfaces/users.interface';
declare global {
    namespace Express {
        export interface Request {
            currentUser: IUser;
        }
    }
}
