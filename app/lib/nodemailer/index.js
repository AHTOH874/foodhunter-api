import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const mailer = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'robot@foodhunter.by',
        pass: 'sY2-RHa-8gn-AG8'
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
            from: 'robot@foodhunter.by', subject, template, context, to
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