import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '@/services/auth.service';
import { IUserInputDTO } from '@/interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
    const authServiceInstance = Container.get(AuthService);

    app.use('/auth', route);
    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response) => {
            const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
            return res.status(201).json({ user, token });
        },
    );

    route.post(
        '/signin',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response) => {
            const { email, password } = req.body;
            const { user, token } = await authServiceInstance.SignIn(email, password);
            return res.status(200).json({ user, token });
        },
    );

    /**
     * @TODO Let's leave this as a place holder for now
     * The reason for a logout route could be deleting a 'push notification token'
     * so the device stops receiving push notifications after logout.
     *
     * Another use case for advance/enterprise apps, you can store a record of the jwt token
     * emitted for the session and add it to a black list.
     * It's really annoying to develop that but if you had to, please use Redis as your data store
     */
    route.post('/logout', middlewares.isAuth, (req: Request, res: Response) => {
        return res.status(200).end();
    });
};
