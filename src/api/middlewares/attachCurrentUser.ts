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
    try {
        console.log('req.token', req.token)
        const UsersModel = Container.get('usersModel') as Models.UsersModel;
        const userRecord = await UsersModel.findUserById(req.token._id);
        if (!userRecord) {
            return res.sendStatus(401);
        }
        const currentUser = userRecord;
        Reflect.deleteProperty(currentUser, 'password');
        Reflect.deleteProperty(currentUser, 'salt');
        req.currentUser = currentUser;
        return next();
    } catch (e) {
        Logger.error('🔥 Error attaching user to req: %o', e);
        return next(e);
    }
};

export default attachCurrentUser;
