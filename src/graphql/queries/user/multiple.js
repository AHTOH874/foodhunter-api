import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import graphqlFields from 'graphql-fields';

import UserModel from '../../../models/user';
import userType from '../../types/user';

export default {
    type: new GraphQLList(userType),
    description: 'FoodHunter Users',
    args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sort: { type: GraphQLString }
    },
    async resolve(root, args, options, info){
        try{
            const fields = Object.keys(graphqlFields(info));
            return await UserModel.find(null, fields).skip(args.offset).limit(args.limit).sort(args.sort);
        } catch(error) {
            return error;
        }
    }
};