import 'babel-polyfill';

import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { authentication } from './lib/middleware';
import schema from './graphql';

const app = express();

dotenv.config({
  path: __dirname + '/../.env'
});

require('./lib/nodemailer');
require('./lib/mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => res.send('api v1.0'));

app.use(authentication);
app.use('/graphql', cors(), graphqlHTTP(({ userId, clientApp, clientAppId }) => ({
  context: { userId, clientApp, clientAppId },
  pretty: true,
  schema
})));

app.listen(process.env.PORT, () => {
  console.log(`Express Server is Running on ${process.env.PORT} port!`);
})