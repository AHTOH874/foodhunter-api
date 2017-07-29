import { GraphQLEnumType, GraphQLInt } from 'graphql';

export const PriceEnumType = new GraphQLEnumType({
    name: 'Price',
    values: {
        ONE: { value: 0 },
        TWO: { value: 1 },
        THREE: { value: 3 }
    }
});

