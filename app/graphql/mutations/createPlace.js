import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt } from 'graphql';

import PlaceModel from '../../models/PlaceModel';
import PlaceType from '../types/PlaceType';

import { authUser } from '../../lib/permissions';

export default {
  type: PlaceType,
  description: 'Create place',
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLID)
    },
    addr: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Full address place'
    },
    coordinates: {
      type: new GraphQLList(GraphQLFloat),
      description: 'Coordinates of place: latitude, longitude'
    },
    price: {
      type: GraphQLInt,
      defaultValue: 1
    },
    categories: {
      type: new GraphQLList(GraphQLID)
    },
  },
  resolve: authUser(async (root, { coordinates, ...data }, { userId }) =>
    await PlaceModel.create({ ...data, loc: { coordinates }, creator: userId }))
}