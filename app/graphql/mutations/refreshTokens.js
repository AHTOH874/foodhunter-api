import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { createJwtToken, createToken } from '../../lib/helpers/crypto';
import AuthPayloadType from '../types/AuthPayloadType';

import RefreshTokenModel from '../../models/RefreshTokenModel';
import ClientAppModel from '../../models/ClientAppModel';

export default {
  type: AuthPayloadType,
  description: 'Refresh token',
  args: {
    clientId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    clientSecret: {
      type: new GraphQLNonNull(GraphQLString)
    },
    refreshToken: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root, args){
    const clientApp = await ClientAppModel.findOne({ _id: args.clientAppId, secret: args.clientAppSecret });

    if(!clientApp){
      return new Error('Client App data is not valid');
    }

    const receivedRefreshToken = await RefreshTokenModel.findOne({ token: args.refreshToken });

    if(
      !receivedRefreshToken  ||
      !receivedRefreshToken.isValid() ||
      !args.clientAppId.equals(receivedRefreshToken.clientAppId)
    ){
      return new Error('Refresh token not found or expires');
    }

    const dataRefreshToken = { clientAppId: args.clientAppId, userId: receivedRefreshToken.userId };
    await receivedRefreshToken.remove();

    const refreshToken = await new RefreshTokenModel({
      token: createToken(), ...dataRefreshToken
    }).save();

    if(!refreshToken || !refreshToken.token){
      return new Error('Error generation refresh token');
    }

    const token = createJwtToken(
      { id: dataRefreshToken.userId, clientAppId: dataRefreshToken.clientAppId },
      process.env.AUTH_SECRET,
      process.env.AUTH_TOKEN_EXPIRES
    );

    return { token, refreshToken: refreshToken.token }
  }
}