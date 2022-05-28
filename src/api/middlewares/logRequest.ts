import { Container } from 'typedi';


export default (req, res, next) => {
    const logger: Utils.Logger = Container.get('logger');
    logger.info(`Request from ${req.ip} to ${req.originalUrl} with body: ${JSON.stringify(req.body)}`);
    next();
}