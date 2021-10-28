import express from 'express';
import  'express-async-errors'
import mongoose from 'mongoose';
import { recipiRoutes } from './src/routes/recipi';

const app = express();
const PORT = 8000;

recipiRoutes(app);
const MONGO_URI = 'mongodb://localhost:27017/smoothie';

const init = async() => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected');
    } catch (e) {
        console.log(e);
    }

    app.listen(PORT, () => {
        console.log('Application started');
    });
};

init();