import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const connection = mongoose.connect('mongodb://localhost/foodhunter', {
    useMongoClient: true
});

connection
    .on('error', (err) => {
        console.error('MongoDB connection error', err);
    })
    .once('open', () => {
        console.info('Mongoose connect');
    });

export default mongoose;
