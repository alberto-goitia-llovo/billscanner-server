import { Container } from 'typedi';
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
import LoggerInstance from './logger';
import config from '@/config';
import { Logger } from 'winston';

export default ({ models }: { models: { name: string; model: any }[] }) => {
    try {
        //Setting all the mongoose models into the container in order to be injected into services
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
