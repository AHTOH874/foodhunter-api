import { GraphQLID, GraphQLNonNull } from 'graphql';
import graphqlFields from 'graphql-fields';

import UserModel from '../../../models/user';
import userType from '../../types/user';

export default {
    type: userType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(root, args, options, info){
        try{
            const fields = Object.keys(graphqlFields(info));
            return await UserModel.findById(args.id, fields);
        } catch(error) {
            return new Error('User not found');
        }
    }
};