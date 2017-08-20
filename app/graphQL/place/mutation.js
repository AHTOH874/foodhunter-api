import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLInputObjectType } from 'graphql';

import PlaceModel from '../../models/place';
import PlaceType from './type';
import pubsub from '../../lib/pubsub';

import { authenticated } from '../../lib/permissions';

const FileType = new GraphQLInputObjectType({
    name: 'File',
    fields: {
        originalname: {
            type: GraphQLString
        },
        mimetype: {
            type: GraphQLFloat
        },
        encoding: {
            type: GraphQLFloat
        },
        destination: {
            type: GraphQLFloat
        },
        filename: {
            type: GraphQLFloat
        },
        path: {
            type: GraphQLFloat
        },
        size: {
            type: GraphQLInt
        }
    }
});

export default {
    Create: {
        type: PlaceType,
        description: 'Create place',
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLID)
            },
            addr: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Full address place'
            },
            coordinates: {
                type: new GraphQLList(GraphQLFloat),
                description: 'Coordinates of place: latitude, longitude'
            },
            price: {
                type: GraphQLInt,
                defaultValue: 1
            },
            categories: {
                type: new GraphQLList(GraphQLID)
            },
            files: {
                type: FileType
            }
        },
        resolve: authenticated(async (root, { coordinates, ...data }, context, info) => {
            console.log('mutation', data);


            const place = await PlaceModel.create({ ...data, loc: { coordinates }, creator: context.user })
            pubsub.publish('Link', { Link: place});
            return place;
        })
    }
}