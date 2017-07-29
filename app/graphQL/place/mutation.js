import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } from 'graphql';

import PlaceModel from '../../models/place';
import PlaceType from './type';

import { authenticated } from '../../lib/permissions';

export default {
    Create: {
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
            }
        },
        resolve: authenticated(async (root, { coordinates, ...data }, context, info) =>
            await PlaceModel.create({ ...data, loc: { coordinates }, creator: context.user }))
    }
}