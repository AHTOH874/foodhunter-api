import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
    name: 'Photo',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        url: {
            type: new GraphQLNonNull(GraphQLString)
        },
        dimensions: {
            type: PhotoDimensionsType,
            resolve: (root) => root.dimensions
        },
    }
});


const PhotoDimensionsType = new GraphQLObjectType({
    name: 'PhotoDimensions',
    fields: {
        width: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        height: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        format: {
            type: new GraphQLNonNull(GraphQLString)
        },
        bytes: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    }
})