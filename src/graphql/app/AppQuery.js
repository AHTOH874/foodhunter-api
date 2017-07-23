import { GraphQLNonNull, GraphQLID } from 'graphql';

import AppModel from '../../models/app';
import AppType from './AppType'

export default {
    App: {
        type: AppType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(root, args, options, info){
            try{
                return await AppModel.findById(args.id);
            } catch(error) {
                return new Error('App not found');
            }
        }
    }
}