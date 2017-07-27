import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import AuthMutation from './auth/mutation';

import UserQuery from './user/query';

import ClientMutation from './client/mutation';
import ClientQuery from './client/query';

import PlaceQuery from './place/query';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            Client: ClientQuery.Client,

            Users: UserQuery.Users,
            User: UserQuery.User,
            Me: UserQuery.Me,

            Place: PlaceQuery.Place
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            Authorization: AuthMutation.Authorization,
            RefreshTokens: AuthMutation.RefreshTokens,

            ClientRefreshSecret: ClientMutation.ClientRefreshSecret
        }
    })
});