import { GraphQLList, GraphQLInt, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import graphqlFields from 'graphql-fields';

import ReviewModel from '../../../models/review';
import reviewType from '../../types/review';

export default {
    type: new GraphQLList(reviewType),
    description: 'Reviews Place',
    args: {
        placeId: { type: new GraphQLNonNull(GraphQLID) },
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sort: { type: GraphQLString },
    },
    async resolve(root, args, options, info){
        try{
            const fields = Object.keys(graphqlFields(info));
            return await ReviewModel.find({ placeId: args.placeId }, fields).skip(args.offset).limit(args.limit).sort(args.sort);
        } catch(error) {
            return new Error('Review not found');
        }
    }
};