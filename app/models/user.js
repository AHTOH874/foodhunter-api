import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

/**
 * Переделать схему пользователя:
 * authProviders: {
 *    email: {
 *      hashedPassword,
 *      salt
 *    },
 *    facebook: {},
 *    vk: {}
 * }
 */

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    salt: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    resetPassword: {
        token: {
            type: String,
        },
        expires: {
            type: Date
        }
    }
}, {
    collection: 'users',
    timestamps: true
});

userSchema.virtual('password').set(function(password){
    this._plainPassword = password;
    this.salt = crypto.randomBytes(128).toString('base64');
    this.hashedPassword = this.encryptPassword(password);
}).get(function(){ return this._plainPassword })

userSchema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

export default mongoose.model('User', userSchema);