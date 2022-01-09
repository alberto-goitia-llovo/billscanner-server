"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_middleware_1 = require("@useoptic/express-middleware");
const api_1 = __importDefault(require("@/api"));
const config_1 = __importDefault(require("@/config"));
exports.default = ({ app }) => {
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
    app.use((0, cors_1.default)());
    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    // app.use(require('method-override')());
    // Transforms the raw string of req.body into json
    app.use(express_1.default.json());
    app.use(formatResponse);
    // Load API routes
    app.use(config_1.default.api.prefix, (0, api_1.default)());
    // API Documentation
    app.use((0, express_middleware_1.OpticMiddleware)({
        enabled: process.env.NODE_ENV !== 'production',
    }));
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        console.log("NOT FOUND");
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
    const originJson = res.json;
    res.json = (data, a, b) => {
        var _a;
        const fixedResponse = {
            status: res.statusCode,
            data: data.error ? null : data,
            message: ((_a = data.error) === null || _a === void 0 ? void 0 : _a.message) || null
        };
        originJson.call(res, Object.assign({}, fixedResponse));
    };
    next();
}
//# sourceMappingURL=express.js.map