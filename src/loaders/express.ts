import express from 'express';
import cors from 'cors';
import { OpticMiddleware } from '@useoptic/express-middleware';
import routes from '@/api';
import config from '@/config';
export default ({ app }: { app: express.Application }) => {
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
    app.use(express.json());
    app.use(formatResponse)
    // Load API routes
    app.use(config.api.prefix, routes());

    // API Documentation
    app.use(OpticMiddleware({
        enabled: process.env.NODE_ENV !== 'production',
    }));

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        console.log("NOT FOUND")
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        //global error handlers
        //all errors will be handled here
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
            },
        });
    });

};

/**
 * Interceptor of the res.json() method.
 * Overrides the response according to the format {status, data, message} 
 * @param req 
 * @param res 
 * @param next 
 */
function formatResponse(req, res, next) {
    const originJson = res.json
    res.json = (data, a, b) => {
        const fixedResponse = {
            status: res.statusCode,
            data: data.error ? null : data,
            message: data.error?.message || null
        }
        originJson.call(res, { ...fixedResponse })
    }
    next()
}
