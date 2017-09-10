import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { createJwtToken, createToken } from '../../lib/helpers/crypto';
import AuthPayloadType from '../types/AuthPayloadType';

import RefreshTokenModel from '../../models/RefreshTokenModel';
import ClientModel from '../../models/ClientModel';
import UserModel from '../../models/UserModel';

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
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email or username'
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root, args){
    const client = await ClientModel.findOne({ _id: args.clientId, secret: args.clientSecret });

    if(!client){
      return new Error('Client data is not valid');
    }

    const user = await UserModel.findOne({
      $or:[{ username: args.username}, { email: args.username }]
    });

    if(!user || !user.checkPassword(args.password)){
      return new Error('Username, Email or password is not valid');
    }

    const dataRefreshToken = { userId: user._id, clientId: client._id };
    await RefreshTokenModel.remove(dataRefreshToken);

    const refreshToken = await new RefreshTokenModel({
      token: createToken(), ...dataRefreshToken
    }).save();

    if(!refreshToken || refreshToken && !refreshToken.token){
      return new Error('Error generation refresh token');
    }

    const token = createJwtToken(
      { id: user._id, clientId: client._id },
      process.env.AUTH_SECRET,
      process.env.AUTH_TOKEN_EXPIRES
    );

    return { token, refreshToken: refreshToken.token }
  }
}