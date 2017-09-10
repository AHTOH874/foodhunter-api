import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { createJwtToken, createToken } from '../../lib/helpers/crypto';
import AuthPayloadType from '../types/AuthPayloadType';

import RefreshTokenModel from '../../models/RefreshTokenModel';
import ClientModel from '../../models/ClientModel';

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
    const client = await ClientModel.findOne({ _id: args.clientId, secret: args.clientSecret });

    if(!client){
      return new Error('Client data is not valid');
    }

    const receivedRefreshToken = await RefreshTokenModel.findOne({ token: args.refreshToken });

    if(
      !receivedRefreshToken  ||
      !receivedRefreshToken.isValid() ||
      !client._id.equals(receivedRefreshToken.clientId)
    ){
      return new Error('Refresh token not found or expires');
    }

    const dataRefreshToken = { clientId: client._id, userId: receivedRefreshToken.userId };
    await receivedRefreshToken.remove();

    const refreshToken = await new RefreshTokenModel({
      token: createToken(), ...dataRefreshToken
    }).save();

    if(!refreshToken || !refreshToken.token){
      return new Error('Error generation refresh token');
    }

    const token = createJwtToken(
      { id: dataRefreshToken.userId, clientId: dataRefreshToken.clientId },
      process.env.AUTH_SECRET,
      process.env.AUTH_TOKEN_EXPIRES
    );

    return { token, refreshToken: refreshToken.token }
  }
}