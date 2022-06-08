import { Container } from 'typedi';
import { Logger } from 'winston';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
    const Logger: Logger = Container.get('logger');
    const UsersModel = Container.get('usersModel') as Models.UsersModel;
    const userRecord = await UsersModel.findUserById(req.token._id);
    if (!userRecord) throw new Error(`User ${req.token._id} not found`);
    const currentUser = userRecord;
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
};

export default attachCurrentUser;
