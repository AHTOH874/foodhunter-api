import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt,
    GraphQLID, GraphQLList, GraphQLFloat
} from 'graphql';

import CategoryModel from '../../models/CategoryModel';
import ReviewModel from '../../models/ReviewModel';
import UserModel from '../../models/UserModel';

import CategoryType from '../category/type';
import ReviewType from '../review/type';
import UserType from '../user/type';

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
        addr: {
            type: new GraphQLNonNull(GraphQLString)
        },
        loc: {
            type: new GraphQLNonNull(LocationType),
            resolve: (root) => root.loc
        },
        rating: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        creator: {
            type: new GraphQLNonNull(UserType),
            resolve: async (root) => await UserModel.findById(root.creator)
        },
        price: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve: async (root) => await CategoryModel.find({ _id: { $in: root.categories } })
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            args: {
                first: {
                    type: GraphQLInt,
                    defaultValue: 10
                },
                skip: {
                    type: GraphQLInt,
                    defaultValue: 0
                },
                sort: {
                    type: GraphQLString
                }
            },
            resolve: async (root, { first, skip, sort }) => {
                return await ReviewModel.find({ placeId: root._id }).sort(sort).limit(first).skip(skip);
            }
        }
    }
});