import graphqlHTTP from 'express-graphql';
import express from 'express';

import schema from './graphql';
import './lib/mongoose';

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}));

app.listen(3000, () => {
    console.log('Express Server is Running!');
})

