import { Container } from 'typedi';
import Logger from '@/services/logger.service';
import UsersModel from '@/models/mysql/users.model';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
    const userRecord = await UsersModel.findUserById(req.token._id);
    if (!userRecord) throw new Error(`User not found`);
    const currentUser = userRecord;
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
};

export default attachCurrentUser;
