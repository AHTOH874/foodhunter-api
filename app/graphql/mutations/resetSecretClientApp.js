import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import ClientAppModel from '../../models/ClientAppModel';
import ClientAppType from '../types/ClientAppType';

import { authUser } from '../../lib/permissions';
import { createToken } from '../../lib/helpers/crypto';

export default {
  type: ClientAppType,
  description: 'Reset secret client app',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: authUser(async (root, { id }, { userId }) => {
    const clientApp = await ClientAppModel.findById(id);
    
    if(!clientApp || !clientApp.user_id.equals(userId)) {
      return new Error('Client App not found');
    }

    clientApp.secret = createToken();
    await clientApp.save();

    return clientApp;
  })
}