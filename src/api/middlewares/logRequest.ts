import { Container } from 'typedi';
import Logger from '@/services/logger.service';


export default (req, res, next) => {
    Logger.info(`Request from ${req.ip} to ${req.originalUrl} with body: ${JSON.stringify(req.body)}`);
    next();
}