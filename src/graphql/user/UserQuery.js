import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLString } from 'graphql';
import graphqlFields from 'graphql-fields';

import UserModel from '../../models/user';
import UserType from './UserType'

import { compose, authenticated } from '../../lib/permissions';

export default {
    Me: {
        type: UserType,
        resolve: authenticated(async (root, args, context, info) => {
            try{
                const fields = Object.keys(graphqlFields(info));
                return await UserModel.findById(context.user, fields);
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
                const fields = Object.keys(graphqlFields(info));
                return await UserModel.findById(args.id, fields);
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
        resolve: compose(authenticated)(async (root, args, context, info) => {
            try{
                const fields = Object.keys(graphqlFields(info));
                return await UserModel.find(null, fields).skip(args.offset).limit(args.limit).sort(args.sort);
            } catch(error) {
                return error;
            }
        })

    }
}