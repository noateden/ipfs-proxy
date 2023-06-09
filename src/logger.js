const winston = require('winston');

const customFormat = winston.format.printf(({ timestamp, level, label, message, props }) => {
  let propsLine = '';

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      propsLine += `${key}=${value} `;
    }
  }

  return `${timestamp} [${label}] ${level}: ${message.padEnd(40)} ${propsLine.slice(0, -1)}`;
});

module.exports = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), customFormat),
  transports: [new winston.transports.Console({})],
});
