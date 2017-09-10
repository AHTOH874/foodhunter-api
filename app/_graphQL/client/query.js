import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import ClientModel from '../../models/ClientModel';
import ClientType from './type';

import { authenticated } from '../../lib/permissions';

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
        resolve: authenticated(async (root, args, options, info) => {
            try{
                return await ClientModel.findById(args.id);
            } catch(error) {
                return new Error('Client not found');
            }
        })
    }
}