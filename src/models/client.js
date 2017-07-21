import mongoose, { Schema } from 'mongoose';

const clientSchema =  new Schema({
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
});

export default mongoose.model('Client', clientSchema);