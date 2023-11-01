const dotenv = require("dotenv");
const express = require("express");
const categoriesRoute = require('./routes/categories');
const brandsRoute = require('./routes/brands');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config({path: './config/config.env'});
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static('public'));

//Add server routes
app.use('/api/products/categories', categoriesRoute);
app.use('/api/products/brands', brandsRoute);

//Hook error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Running in ${ENV} on ${PORT}, waiting for requests`);
});