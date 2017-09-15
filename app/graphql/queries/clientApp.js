import { GraphQLNonNull, GraphQLID } from 'graphql';

import ClientAppModel from '../../models/ClientAppModel';
import ClientAppType from '../types/ClientAppType';

import { authUser } from '../../lib/permissions';

export default {
  type: ClientAppType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: authUser(async (root, { id }, { userId }) => {
    const clientApp = await ClientAppModel.findById(id);

    if(clientApp && clientApp.user_id.equals(userId)){
      return clientApp;
    } else return new Error('ClientApp not found');
  })
}