import jwt from 'express-jwt';
import config from '@/config';
import { getTokenFromHeader } from '@/utils/token.util';

//Decodes and saves the token payload in req.token. Also checks if it's a valid token
const isAuth = jwt({
    secret: config.jwtSecret, // The _secret_ to sign the JWTs
    algorithms: [config.jwtAlgorithm], // JWT Algorithm
    userProperty: 'token', // Use req.token to store the JWT
    getToken: getTokenFromHeader, // How to extract the JWT from the request

});

export default isAuth;
