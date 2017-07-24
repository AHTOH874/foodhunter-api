import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import AuthMutation from './auth/mutation';

import UserQuery from './user/query';

import AppMutation from './app/mutation';
import AppQuery from './app/query';

import PlaceQuery from './place/query';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            App: AppQuery.App,

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

            AppRefreshSecret: AppMutation.AppRefreshSecret
        }
    })
});