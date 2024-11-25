import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'

const app = express();
dotenv.config();

const connect = () => {
//   mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};


app.listen(8000, () => {
    connect()
    console.log('Server is running on port 8000');
});






