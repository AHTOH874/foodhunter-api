import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import ClientModel from '../../models/ClientModel';
import UserModel from '../../models/UserModel';
import RegistrationPayload from './type';

import { sendEmail } from '../../lib/nodemailer';

export default {
    Registration: {
        type: RegistrationPayload,
        description: 'Registration user',
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
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(root, args, context, info){
            const client = await ClientModel.findById(args.clientId);

            if(client && client.checkSecret(args.clientSecret)){
                try{
                    const user = await new UserModel({
                        username: args.username, password: args.password, email: args.email
                    }).save();

                    if(user && user.confirmedEmail.token){
                        await sendEmail({
                            template: 'confirmedEmail',
                            subject: 'Подтверждение адреса электронной почты',
                            to: user.email,
                            context: {
                                url: `${client.callbackUrl}confirmedEmail/${user.confirmedEmail.token}`,
                                token: user.confirmedEmail.token
                            }
                        });
                    }
                } catch(error) {
                    throw error;
                }

                // const user = await UserModel.findOne({ email: args.email });
                //
                // if(user && user.checkPassword(args.password)){
                //     return await createJwtTokens({ id: user.id, name: user.name, app: app.id }, process.env.SECRET);
                // } else {
                //     throw new Error('Email or password invalid');
                // }
            } else {
                throw new Error('Client not found');
            }
        }
    }
}