import winston from 'winston';
import util from 'util';
import { DateTime } from 'luxon';
import config from '@/config';

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: createTransports(),
});

function createTransports() {
    const TRANSPORTS = []
    TRANSPORTS.push(new winston.transports.Console({
        format: winston.format.printf(consoleFormat()),
        level: config.logs.level, // Muestra logs de nivel 3 o menor
        handleExceptions: false,
    }))
    Object.keys(winston.config.npm.levels).forEach(level => {
        TRANSPORTS.push(new winston.transports.File({
            format: winston.format.printf(fileFormat()),
            level: level,
            handleExceptions: false,
            filename: `logs/${level}.log`,
            maxsize: 5242880, // 5242880 Bytes = 5 MB
            maxFiles: 5,
        }))
    })
    return TRANSPORTS
}

function consoleFormat() {
    const COLORS = {
        error: `\x1b[91m`, // LIGHT_RED
        warn: `\x1b[93m`, // LIGHT_YELLOW
        info: `\x1b[96m`, // LIGHT_CYAN
        reset: `\x1b[0m`,  // Restaura al color por defecto
    }
    return (info) => {
        const START = COLORS[info.level] || COLORS.reset;
        const END = COLORS.reset
        const TIMESTAMP = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')
        const LEVEL = info.level
        const MESSAGE = info.message
        const DATA = info.data ? util.inspect(info.data, false, null) : ''
        return `${START} ${TIMESTAMP} [${LEVEL}] ${MESSAGE} ${DATA} ${END}`
    }
}

function fileFormat() {
    return (info) => {
        const TIMESTAMP = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')
        const LEVEL = info.level
        const MESSAGE = info.message
        const DATA = info.data ? util.inspect(info.data, false, null) : null
        return JSON.stringify({
            timestamp: TIMESTAMP,
            level: LEVEL,
            message: MESSAGE,
            data: DATA,
        })
    }
}

export default LoggerInstance;