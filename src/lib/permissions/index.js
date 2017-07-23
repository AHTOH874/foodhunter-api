// https://gist.github.com/dewey92/d986e44c9b2d4233f4c8811b57fa6d91
export const compose = (...fns) => e => fns.reduceRight((acc, fn) => fn(acc), e)

export const authenticated = (resolver) => (parent, args, context, info) => {
    if (context.user) {
        return resolver(parent, args, context, info);
    }

    throw new Error('User is not authenticated');
}