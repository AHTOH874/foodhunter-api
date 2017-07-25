import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLString } from 'graphql';

import UserModel from '../../models/user';
import UserType from './type'

import { compose, authenticated } from '../../lib/permissions';

export default {
    Me: {
        type: UserType,
        resolve: authenticated(async (root, args, context, info) => {
            try{
                return await UserModel.findById(context.user);
            } catch(error) {
                return new Error('User not found');
            }
        })
    },
    User: {
        type: UserType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve: authenticated(async (root, args, context, info) => {
            try{
                return await UserModel.findById(args.id);
            } catch(error) {
                return new Error('User not found');
            }
        })
    },
    Users: {
        type: new GraphQLList(UserType),
        args: {
            offset: { type: GraphQLInt },
            limit: { type: GraphQLInt },
            sort: { type: GraphQLString }
        },
        resolve: authenticated(async (root, args, context, info) => {
            try{
                return await UserModel.find().skip(args.offset).limit(args.limit).sort(args.sort);
            } catch(error) {
                return error;
            }
        })

    }
}