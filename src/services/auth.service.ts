import 'reflect-metadata'; // We need this in order to use @Decorators
import { Service, Inject, Container } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '@/config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import events from '@/subscribers/events';

const handledErrorCodes = {
    11000: { message: "User already exists" }
}
@Service()
export default class AuthService {
    constructor(
        @Inject('userModel') private userModel: Models.UserModel,
        @Inject('logger') private logger: Utils.Logger,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) {
    }

    public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
        //Checking if user already exists
        const existingUser = await this.userModel.findUser(userInputDTO.email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const salt = randomBytes(32);
        this.logger.silly('Hashing password');
        const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
        this.logger.silly('Creating user db record');
        let new_user_data = {
            email: userInputDTO.email,
            name: userInputDTO.name,
            password: hashedPassword,
            salt: salt.toString('hex')
        };
        new_user_data['salt'] = salt.toString('hex');
        new_user_data['password'] = hashedPassword;
        await this.userModel.createNewUser(new_user_data)
        const userRecord = await this.userModel.findUser(userInputDTO.email);
        if (!userRecord) {
            throw new Error('Error creating user');
        }
        this.logger.silly('Generating JWT');
        const token = this.generateToken(userRecord);

        this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });
        const user = userRecord;
        delete user.password;
        delete user.salt;
        return { user, token };
    }

    public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const userRecord = await this.userModel.findUser(email);
        if (!userRecord) {
            throw new Error('User not registered');
        }
        /**
         * We use verify from argon2 to prevent 'timing based' attacks
         */
        this.logger.silly('Checking password');
        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {
            this.logger.silly('Password is valid!');
            this.logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);

            const user = userRecord;
            delete user.password;
            delete user.salt;
            return { user, token };
        } else {
            throw new Error('Invalid password');
        }
    }


    private generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        // exp.setDate(today.getDate() + 60);
        exp.setDate(today.getDate() + 1);

        /**
         * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
         * The cool thing is that you can add custom properties a.k.a metadata
         * Here we are adding the userId, role and name
         * Beware that the metadata is public and can be decoded without _the secret_
         * but the client cannot craft a JWT to fake a userId
         * because it doesn't have _the secret_ to sign it
         * more information here: https://softwareontheroad.com/you-dont-need-passport
         */
        this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jwt.sign(
            {
                _id: user._id, // We are gonna use this in the middleware 'isAuth'
                role: user.role,
                name: user.name,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret,
            { algorithm: config.jwtAlgorithm as jwt.Algorithm }
        );
    }
}
