import { Container } from 'typedi';
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
import LoggerInstance from './logger';
import agendaFactory from './agenda';
import config from '@/config';
import { Logger } from 'winston';

export default ({ mongoConnection, models }: { mongoConnection; models: { name: string; model: any }[] }) => {
    try {
        //Setting all the mongoose models into the container in order to be injected into services
        models.forEach(m => {
            Container.set(m.name, m.model);
        });

        const agendaInstance = agendaFactory({ mongoConnection });
        // const mgInstance = new Mailgun(formData);


        Container.set('agendaInstance', agendaInstance);
        Container.set('logger', LoggerInstance);
        const Logger: Logger = Container.get('logger');
        Logger.info("INSTACIA DEL LOOOOOGGGEEER")
        // Container.set('emailClient', mgInstance.client({ key: config.emails.apiKey, username: config.emails.apiUsername }));
        Container.set('emailDomain', config.emails.domain);

        LoggerInstance.info('✌️ Agenda injected into container');

        return { agenda: agendaInstance };
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
