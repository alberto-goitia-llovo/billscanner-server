import express from 'express';
import cors from 'cors';
import { OpticMiddleware } from '@useoptic/express-middleware';
import routes from '@/api';
import config from '@/config';
import logRequest from '@/api/middlewares/logRequest';
import 'express-async-errors';
import { Container } from 'typedi';
export default ({ app }: { app: express.Application }) => {
    const logger: Utils.Logger = Container.get('logger');
    /**
     * Health Check endpoints
     * @TODO Explain why they are here
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    // app.use(require('method-override')());

    // Transforms the raw string of req.body into json
    // app.use(middleware);
    app.use(express.json());
    app.use(logRequest);


    // Load API routes
    app.use(config.api.prefix, routes())

    // API Documentation
    app.use(OpticMiddleware({
        enabled: process.env.NODE_ENV !== 'production',
    }));

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        let handled_error = HANDLED_ERRORS[err.message]
        if (handled_error) {
            err.message = handled_error.message
            err.status = handled_error.status
        } else {
            logger.error(err.message, err.stack)
            err.status = 500;
            err.message = "Something went wrong"
        }
        res.status(err.status)
        res.json(err);
    });
};

const HANDLED_ERRORS = {
    //Auth errors
    'User already exists': {
        status: 409,
        message: 'User already exists',
    },
    'User not registered': {
        status: 403,
        message: 'User not registered',
    },
    'Invalid password': {
        status: 403,
        message: 'Invalid password',
    },
    'No authorization token was found': {
        status: 401,
        message: 'Credentials are required',
    }
}