import { Container } from 'typedi';
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
import LoggerInstance from './logger';
import config from '@/config';
import { Logger } from 'winston';

export default ({ mysqlPool, models }: { mysqlPool; models: { name: string; model: any }[] }) => {
    try {
        //Setting all the mongoose models into the container in order to be injected into services
        models.forEach(m => {
            Container.set(m.name, m.model);
        });

        // const mgInstance = new Mailgun(formData);

        Container.set('logger', LoggerInstance);
        // Container.set('emailClient', mgInstance.client({ key: config.emails.apiKey, username: config.emails.apiUsername }));
        Container.set('emailDomain', config.emails.domain);

        return;
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
