import express from 'express';
import  'express-async-errors'
import mongoose from 'mongoose';
import { recipeRoutes } from './routes/recipi';
import { subscribeRoutes } from './routes/subscribe';
import { authorRoutes } from './routes/auhtor';
import { categoryRoutes } from './routes/category';
import { searchRoutes } from './routes/search';
import { dynamicRoutes } from './routes/dynamic-routes'
import * as bodyParser from 'body-parser';
const cors = require('cors');
import 'dotenv/config'


const app = express();
app.use(cors()); // TODO remove me
const PORT = process.env.PORT || 8000;

const MONGO_URI = process.env.MONGO_URI!;

app.use(bodyParser.json());

recipeRoutes(app);
subscribeRoutes(app);
authorRoutes(app);
categoryRoutes(app);
searchRoutes(app);
dynamicRoutes(app);

const init = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected');
    } catch (e) {
        console.log(e);
    }

    app.listen(PORT, () => {
        console.log('Application started');
    });
};

init();