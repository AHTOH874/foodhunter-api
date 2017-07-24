import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';

import { authentication } from './lib/middleware';
import schema from './graphQL/index';
import './lib/mongoose';

const app = express();
dotenv.config({ path: '.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authentication);
app.use('/graphql', graphqlHTTP({
    formatError: (error) => process.env.NODE_ENV === 'development' ? error : { message: error.message },
    graphiql: process.env.NODE_ENV === 'development',
    pretty: true,
    schema
}));

app.listen(3000, () => {
    console.log('Express Server is Running!');
})