import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { createJwtToken, createToken } from '../../lib/helpers/crypto';
import AuthPayloadType from '../types/AuthPayloadType';

import RefreshTokenModel from '../../models/RefreshTokenModel';
import ClientAppModel from '../../models/ClientAppModel';
import UserModel from '../../models/UserModel';

export default {
  type: AuthPayloadType,
  description: 'Authorization',
  args: {
    clientAppId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    clientAppSecret: {
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
    const clientApp = await ClientAppModel.findOne({ _id: args.clientAppId, secret: args.clientAppSecret });

    if(!clientApp){
      return new Error('Client App data is not valid');
    }

    const user = await UserModel.findOne({
      $or:[{ username: args.username}, { email: args.username }]
    });

    if(!user || !user.checkPassword(args.password)){
      return new Error('Username, Email or password is not valid');
    }

    const dataRefreshToken = { userId: user._id, clientAppId: args.clientAppId };
    await RefreshTokenModel.remove(dataRefreshToken);

    const refreshToken = await new RefreshTokenModel({
      token: createToken(), ...dataRefreshToken
    }).save();

    if(!refreshToken || refreshToken && !refreshToken.token){
      return new Error('Error generation refresh token');
    }

    const token = createJwtToken(
      { id: user._id, clientAppId: args.clientAppId },
      process.env.AUTH_SECRET,
      Number(process.env.AUTH_TOKEN_EXPIRES)
    );

    return { token, refreshToken: refreshToken.token }
  }
}