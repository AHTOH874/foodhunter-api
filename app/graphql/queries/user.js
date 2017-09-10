import { GraphQLNonNull, GraphQLID } from 'graphql';
import UserModel from '../../models/UserModel';
import UserType from '../types/UserType';

import { authUser } from '../../lib/permissions';

export default {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: authUser(async (root, { id }) => {
    const user = await UserModel.findById(id);

    if(!user) return new Error('User not found');
    return user;
  })
}