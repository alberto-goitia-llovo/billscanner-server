import { Container } from 'typedi';
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
import LoggerInstance from '../services/logger.service';
import config from '@/config';
import { Logger } from 'winston';

export default ({ models }: { models: { name: string; model: any }[] }) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });


        Container.set('logger', LoggerInstance);
        Container.set('emailDomain', config.emails.domain);

        return;
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
