import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLString, GraphQLFloat } from 'graphql';

import PlaceModel from '../../models/PlaceModel';
import PlaceType from './type'

import { compose, authenticated } from '../../lib/permissions';

export default {
    Place: {
        type: PlaceType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve: authenticated(async (root, args, context, info) => {
            try{
                return await PlaceModel.findById(args.id);
            } catch(error) {
                return new Error('Place not found');
            }
        })
    },
    PlacesMap: {
        type: new GraphQLList(PlaceType),
        args: {
            fp: {
                type: new GraphQLList(GraphQLFloat),
                description: 'Coordinates of first point: latitude, longitude'
            },
            sp: {
                type: new GraphQLList(GraphQLFloat),
                description: 'Coordinates of second point: latitude, longitude'
            }
        },
        resolve: authenticated(async (root, args) =>
            await PlaceModel.find({ loc: { $geoWithin: { $box: [ args.fp, args.sp] }} }))
    }
}