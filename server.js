const dotenv = require("dotenv");
const express = require("express");
const categoriesRoute = require('./routes/categories');
const brandsRoute = require('./routes/brands');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const sequelize = require('./config/db');
const Category = require('./models/category');
const Brand = require('./models/brand');
const Product = require('./models/product');
const Role = require('./models/role');
const User = require('./models/user');
const Address = require('./models/address');

dotenv.config({path: './config/config.env'});
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static('public'));

//Add server routes
app.use('/api/products/categories', categoriesRoute);
app.use('/api/products/brands', brandsRoute);
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);

//Hook error handler
app.use(errorHandler);

Category.hasMany(Product, {foreignKey: {name: 'category_id', allowNull: false}});

Brand.hasMany(Product, {foreignKey: {name: 'brand_id', allowNull: false}});

Product.belongsTo(Category, {foreignKey: {name: 'category_id', allowNull: false}});
Product.belongsTo(Brand, {foreignKey: {name: 'brand_id', allowNull: false}});

Address.hasOne(User, {foreignKey: 'address_id', allowNull: false, onDelete: 'CASCADE'});
User.belongsTo(Address, {foreignKey: 'address_id', allowNull: false, onDelete: 'CASCADE'});
User.belongsToMany(Role, { through: 'user_role', foreignKey: 'user_id', timestamps: false });
Role.belongsToMany(User, { through: 'user_role', foreignKey: 'role_id', timestamps: false });

sequelize.authenticate().then(() => {
    console.log("Connected successfully");
    sequelize.sync({alter: true}).then((data) => { //alter: true // force: true
        console.log("Models synced");
    }).catch((error) => {
        console.log("Models sync failed:", error);
    });
}).catch((error) => {
    console.log("Connection failed: ", error);
})

app.listen(PORT, () => {
    console.log(`Running in ${ENV} on ${PORT}, waiting for requests`);
});