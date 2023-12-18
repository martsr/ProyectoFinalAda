import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      filename: `${__dirname}/../logs/user.log`,
      level: "info",
      format: format.combine(format.json(), format.prettyPrint()),
    }),
    new transports.File({
      filename: `${__dirname}/../logs/error.log`,
      level: "error",
      format: format.combine(format.json(), format.prettyPrint()),
    }),
  ],
});

export default logger;
