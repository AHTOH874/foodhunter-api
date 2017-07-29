import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } from 'graphql';

import ReviewModel from '../../models/review';
import ReviewType from './type';

import { authenticated } from '../../lib/permissions';

export default {
    Create: {
        type: ReviewType,
        description: 'Create review',
        args: {
            rating: {
                type: GraphQLInt,
                defaultValue: 1
            },
            body: {
                type: new GraphQLNonNull(GraphQLString)
            },
            placeId: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve: authenticated(async (root, args, context, info) =>
            await ReviewModel.create({ ...args, author: context.user }))
    },
    Remove: {
        type: ReviewType,
        description: 'Remove review',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve: authenticated(async (root, args, context, info) => {
            const review = await ReviewModel.findById(args.id);

            if(review){
                if(review.author.equals(context.user)){
                    return await review.remove();
                } else return new Error('You are not the author of this review');
            } else return new Error('Review not found');
        })
    }
}