/**
 * Compose function
 * https://gist.github.com/dewey92/d986e44c9b2d4233f4c8811b57fa6d91
 * @param fns
 */
export const compose = (...fns) => e => fns.reduceRight((acc, fn) => fn(acc), e)

/**
 * Check user authorized
 * @param resolver
 */
export const authUser = (resolver) => (parent, args, context, info) => {
  if(context.userId){
    return resolver(parent, args, context, info);
  }

  throw new Error('User is not authenticated');
}

/**
 * Check client
 * @param resolver
 */
export const authClientApp = (resolver) => (parent, args, context, info) => {
  if(context.clientApp){
    return resolver(parent, args, context, info);
  }

  throw new Error('Client App is not recognized');
};