import {GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql';
import AuthPayloadType from '../types/AuthPayloadType';

export default {
  type: AuthPayloadType,
  description: 'Authorization',
  args: {
    clientId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    clientSecret: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root, args){
    console.log(args);
  }
}