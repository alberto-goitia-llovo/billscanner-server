import jwt from 'jsonwebtoken';
import config from '@/config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import UsersModel from '@/models/mysql/users.model';
import Logger from '@/services/logger.service';

const handledErrorCodes = {
    11000: { message: "User already exists" }
}
export default new class AuthService {
    public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
        //Checking if user already exists
        const existingUser = await UsersModel.findUser(userInputDTO.email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const salt = randomBytes(32);
        Logger.silly('Hashing password');
        const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
        Logger.silly('Creating user db record');
        let new_user_data = {
            email: userInputDTO.email,
            name: userInputDTO.name,
            password: hashedPassword,
            salt: salt.toString('hex')
        };
        new_user_data['salt'] = salt.toString('hex');
        new_user_data['password'] = hashedPassword;
        await UsersModel.createNewUser(new_user_data)
        const userRecord = await UsersModel.findUser(userInputDTO.email);
        if (!userRecord) {
            throw new Error('Error creating user');
        }
        Logger.silly('Generating JWT');
        const token = this.generateToken(userRecord);

        const user = userRecord;
        delete user.password;
        delete user.salt;
        Logger.info(`User ${user.email} signed up successfully`);
        return { user, token };
    }

    public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const userRecord = await UsersModel.findUser(email);
        if (!userRecord) {
            throw new Error('User not registered');
        }
        /**
         * We use verify from argon2 to prevent 'timing based' attacks
         */
        Logger.silly('Checking password');
        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {
            Logger.silly('Password is valid!');
            Logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);

            const user = userRecord;
            delete user.password;
            delete user.salt;
            Logger.info(`User ${user.email} signed in successfully`);
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
        Logger.silly(`Sign JWT for userId: ${user._id}`);
        return jwt.sign(
            {
                _id: user._id, // We are gonna use this in the middleware 'isAuth'
                name: user.name,
                email: user.email,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret,
            { algorithm: config.jwtAlgorithm as jwt.Algorithm }
        );
    }
}
