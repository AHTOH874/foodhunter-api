import mongoose, { Schema } from 'mongoose';

const appSchema =  new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    websiteUrl: {
        type: String
    },
    callbackUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    collection: 'apps',
    timestamps: true
});

appSchema.methods.checkSecret = function(secret) {
    return this.secret === secret;
};

export default mongoose.model('App', appSchema);