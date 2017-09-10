import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const connection = mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    useMongoClient: true
  }
);

connection
  .on('error', (err) => {
    console.error('MongoDB connection error', err);
  })
  .once('open', () => {
    console.info('Mongoose connect');
  });

export default mongoose;