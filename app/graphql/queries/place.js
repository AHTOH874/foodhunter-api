import { GraphQLNonNull, GraphQLID } from 'graphql';

import PlaceModel from '../../models/PlaceModel';
import PlaceType from '../types/PlaceType';

import { authClientApp } from '../../lib/permissions';

export default {
  type: PlaceType,
    args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: authClientApp(async (root, { id }) => {
    const place = await PlaceModel.findById(id);

    if(!place){
      return new Error('Place not found');
    }

    return place;
  })
}