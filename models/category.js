const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,        
        unique: {
            msg: "Category name already exists"
        },
        allowNull: false,
        validate: {
            notNull:{
                msg:'Category name is required'
            },
            len: {
                args: [3, 40],
                msg: "Category name should be between 3 and 40 characters"
            }
        }
    }
},
{timestamps: false});

module.exports = Category;