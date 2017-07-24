import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLString } from 'graphql';

import PlaceModel from '../../models/place';
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
    }
}