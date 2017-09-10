import ClientModel from '../../models/ClientModel';

/**
 * Compose function
 * https://gist.github.com/dewey92/d986e44c9b2d4233f4c8811b57fa6d91
 * @param fns
 */
export const compose = (...fns) => e => fns.reduceRight((acc, fn) => fn(acc), e)

export const authUser = (resolver) => (parent, args, context, info) => {
  if(context.user){
    return resolver(parent, args, context, info);
  }

  throw new Error('User is not authenticated');
}

export const authClient = (resolver) => async (parent, { accessToken }) => {
  if(accessToken) {
    const client = await ClientModel.findOne({ accessToken });

    if(!client){
      return new Error('Client not found');
    }

    context.clientId =
    return resolver(parent, args, context, info);
  }

  throw new Error('Invalid client');
}