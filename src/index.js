import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';

import { authentication } from './lib/middleware';
import schema from './graphql/index';
import './lib/mongoose';

const app = express();
dotenv.config({ path: '.env' });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authentication);
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    pretty: true,
    schema,
    formatError: (error) => process.env.NODE_ENV === 'development'
        ? error
        : { message: error.message }
}));

app.listen(3000, () => {
    console.log('Express Server is Running!');
})