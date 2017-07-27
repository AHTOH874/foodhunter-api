import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import crypto from 'crypto';

import AppModel from '../../models/client';
import AppType from './type';

import { compose, authenticated } from '../../lib/permissions';

export default {
    ClientRefreshSecret: {
        type: AppType,
        description: 'App refresh secret',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve: compose(authenticated)(async (root, args, context, info) => {
            const app = await AppModel.findOne({ _id: args.id });

            if(app && app.user_id.equals(context.user)){
                app.secret = crypto.randomBytes(36).toString('hex');
                app.save();

                return app;
            } else{
                throw new Error('App not found');
            }
        })
    }
}