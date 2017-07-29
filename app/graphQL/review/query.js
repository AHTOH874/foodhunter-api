import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLString } from 'graphql';

import ReviewModel from '../../models/review';
import ReviewType from './type'

import { authenticated } from '../../lib/permissions';

export default {
    Review: {
        type: ReviewType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve: authenticated(async (root, args) => {
            try{
                return await ReviewModel.findById(args.id);
            } catch(error) {
                return new Error('Place not found');
            }
        })
    }
}