import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty'
  },
  // options: {
  //   translateTime: true,
  //   ignore: 'pid,hostname',
  //   colorize: true
  // },
  level: 'info',
  base: {
    pid: false,
  },
});

export default logger;
