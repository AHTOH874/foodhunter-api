import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    dimensions: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        format: {
            type: String,
            required: true
        },
        bytes: {
            type: Number,
            required: true
        }
    }
}, { collection: 'photos' });

export default mongoose.model('Photo', photoSchema);