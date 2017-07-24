import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt,
    GraphQLID, GraphQLList, GraphQLFloat
} from 'graphql';

import CategoryModel from '../../models/category';
import CategoryType from '../category/type';

const LocationType = new GraphQLObjectType({
    name: 'loc',
    fields: {
        type: {
            type: new GraphQLNonNull(GraphQLString)
        },
        coordinates: {
            type: new GraphQLList(GraphQLFloat)
        }
    }
});

export default new GraphQLObjectType({
    name: 'Place',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        loc: {
            type: LocationType,
            resolve: (root) => root.loc
        },
        rating: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        user_id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        price: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve: async (root) => await CategoryModel.find({ _id: { $in: root.categories } })
        }
    }
});