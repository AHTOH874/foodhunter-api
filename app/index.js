import 'babel-polyfill';

import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlExpress } from 'graphql-server-express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';

import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';

import { authentication } from './lib/middleware';
import schema from './graphQL';
import './lib/mongoose';

const app = express();
dotenv.config({ path: '.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authentication);

app.use('/graphql', graphqlExpress(({ user }) => ({
    schema,
    context: { user }
})));

const server = createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Express Server is Running on ${process.env.PORT}!`);
    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server, path: '/subscriptions' }
    );
})