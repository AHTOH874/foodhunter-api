import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }
}, { collection: 'categories' });

export default mongoose.model('Category', categorySchema);