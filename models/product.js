const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,        
        unique: {
            msg: "Product title already exists"
        },
        allowNull: false,
        validate: {
            notNull:{
                msg:'Product title is required'
            },
            len: {
                args: [3, 255],
                msg: "Product title should be at least 3 characters"
            }
        }
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notNull:{
                msg:'price is required'
            },
            isPostive(value) {
                if (value <= 0) {
                    throw new Error("price should be greater than zero");
                }
            }
        }
    },
    offer_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notNull:{
                msg:'offer_price is required'
            },
            isPostive(value) {
                if (value <= 0) {
                    throw new Error("offer_price should be greater than zero");
                }
            }
        }
    }
},
{timestamps: false});

module.exports = Product;