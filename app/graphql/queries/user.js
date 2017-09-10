import {GraphQLNonNull, GraphQLID} from 'graphql';
import UserModel from '../../models/UserModel';
import UserType from '../types/UserType';

export default {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (root, args, context, info) => await UserModel.findById(args.id)
}