import 'babel-polyfill';

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';

import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';

import { authentication, graphqlUpload } from './lib/middleware';
import schema from './graphQL';
import './lib/mongoose';

const app = express();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

dotenv.config({ path: '.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authentication);

app.use(
    '/graphql',
    multipartMiddleware,
    graphqlUpload({ endpointURL: '/graphql' }),
    graphqlExpress(({ user }) => ({
        schema,
        context: { user }
    }))
);

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

const server = createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Express Server is Running on ${process.env.PORT} port!`);
    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server, path: '/subscriptions' }
    );
})