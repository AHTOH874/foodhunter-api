import 'babel-polyfill';

import { graphqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';

import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { authentication } from './lib/middleware';
import schema from './graphQL';

import './lib/nodemailer';
import './lib/mongoose';

const app = express();

// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();
// multipartMiddleware,
// graphqlUpload({ endpointURL: '/graphql' }),

dotenv.config({
    path: __dirname + '/../.env'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authentication);
app.use('/graphql', cors(), graphqlExpress(({ user }) => ({
    context: { user },
	  pretty: true,
    schema,
})));

const server = createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Express Server is Running on ${process.env.PORT} port!`);
    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server, path: '/subscriptions' }
    );
})