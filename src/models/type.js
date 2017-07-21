import mongoose, { Schema } from 'mongoose';

const typeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    parentId: Schema.Types.ObjectId
});

export default mongoose.model('Type', typeSchema);