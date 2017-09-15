import { GraphQLNonNull, GraphQLString } from 'graphql';

import ClientAppModel from '../../models/ClientAppModel';
import ClientAppType from '../types/ClientAppType';

import { authUser } from '../../lib/permissions';

export default {
  type: ClientAppType,
  description: 'Create client app',
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    secret: {
      type: new GraphQLNonNull(GraphQLString)
    },
    accessToken: {
      type: new GraphQLNonNull(GraphQLString)
    },
    websiteUrl: {
      type: GraphQLString
    },
    callbackUrl: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    }
  },
  resolve: authUser(async (root, args, { userId }) => await ClientAppModel.create({ user_id: userId, ...args }))
}