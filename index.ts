import express from 'express';
import  'express-async-errors'
import mongoose from 'mongoose';
import { recipeRoutes } from './src/routes/recipi';
import { subscribeRoutes } from './src/routes/subscribe';
import { authorRoutes } from './src/routes/auhtor';
import { categoryRoutes } from './src/routes/category';
import { searchRoutes } from './src/routes/search';
import { dynamicRoutes } from './src/routes/dynamic-routes'
import * as bodyParser from 'body-parser';
const cors = require('cors');

const app = express();
app.use(cors()); // TODO remove me
const PORT = 8000;
const MONGO_URI = 'mongodb://localhost:27017/smoothie';

app.use(bodyParser.json());

recipeRoutes(app);
subscribeRoutes(app);
authorRoutes(app);
categoryRoutes(app);
searchRoutes(app);
dynamicRoutes(app);

const init = async() => {
    try {
        await mongoose.connect(MONGO_URI );
        console.log('Connected');
    } catch (e) {
        console.log(e);
    }

    app.listen(PORT, () => {
        console.log('Application started');
    });
};

init();