import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import graphqlFields from 'graphql-fields';

import AppModel from '../../models/app';
import AppType from './type';

import { compose, authenticated } from '../../lib/permissions';

export default {
    App: {
        type: AppType,
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
        resolve: compose(authenticated)(async (root, args, options, info) => {
            try{
                const fields = Object.keys(graphqlFields(info)).concat('user_id');
                return await AppModel.findById(args.id, fields);
            } catch(error) {
                return new Error('App not found');
            }
        })
    }
}