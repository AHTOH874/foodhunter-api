import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import AuthMutation from './auth/mutation';

import UserQuery from './user/query';

import ClientMutation from './client/mutation';
import ClientQuery from './client/query';

import PlaceMutation from './place/mutation';
import PlaceQuery from './place/query';

import ReviewMutation from './review/mutation';
import ReviewQuery from './review/query';

import RegistrationMutation from './registration/mutation';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            Client: ClientQuery.Client,

            Users: UserQuery.Users,
            User: UserQuery.User,
            Me: UserQuery.Me,

            Place: PlaceQuery.Place,
            PlacesMap: PlaceQuery.PlacesMap,

            Reviews: ReviewQuery.Reviews,
            Review: ReviewQuery.Review
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            Authorization: AuthMutation.Authorization,
            RefreshTokens: AuthMutation.RefreshTokens,

            Registration: RegistrationMutation.Registration,

            ClientRefreshSecret: ClientMutation.ClientRefreshSecret,

            PlaceCreate: PlaceMutation.Create,

            ReviewCreate: ReviewMutation.Create,
            ReviewRemove: ReviewMutation.Remove
        }
    })
});