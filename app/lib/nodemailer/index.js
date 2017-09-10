import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const mailer = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: __dirname + '/../../views/email/',
    defaultLayout : 'template',
    partialsDir : __dirname + '/../../views/email/partials/'
  },
  viewPath: __dirname + '/../../views/email/',
  extName: '.hbs'
};

mailer.use('compile', hbs(options));

export const sendEmail = ({ template, subject, context, to}) => {
  return new Promise((resolve, reject) => {
    mailer.sendMail({
      from: process.env.EMAIL_USER, subject, template, context, to
    }, function (error, response) {
      if(!error){
          resolve(response);
      } else {
          reject(error);
      }

      mailer.close();
    });
  });
};