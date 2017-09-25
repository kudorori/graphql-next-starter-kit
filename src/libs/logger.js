import winston from "winston";
import { root } from "../../config";
import moment from "moment";
export default new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      filename: `${root}/logger/access/${moment().format("YYYY-MM-DD")}.log`,
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: `${root}/logger/error/${moment().format("YYYY-MM-DD")}.log`,
      level: 'error'
    })
  ]
});
