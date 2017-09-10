import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import * as mutations from './mutations';
import * as queries from './queries';

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: mutations
  }),
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: queries
  })
});