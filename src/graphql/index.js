import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import AppQuery from './app/AppQuery';

import UserMutation from './user/UserMutation'
import UserQuery from './user/UserQuery';

import AuthMutation from './auth/AuthMutation';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            App: AppQuery.App,

            Users: UserQuery.Users,
            User: UserQuery.User,
            Me: UserQuery.Me,
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            Authorization: AuthMutation.Authorization,
            RefreshTokens: AuthMutation.RefreshTokens,
        }
    })
});