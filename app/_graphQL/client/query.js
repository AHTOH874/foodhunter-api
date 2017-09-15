import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import ClientAppModel from '../../models/ClientAppModel';
import ClientType from './type';

import { authUser } from '../../lib/permissions';

export default {
    Client: {
        type: ClientType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLID)
            },
            secret: {
                name: 'secret',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: authUser(async (root, args) => {
            try{
                return await ClientAppModel.findById(args.id);
            } catch(error) {
                return new Error('Client App not found');
            }
        })
    }
}