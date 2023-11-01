const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Brand = sequelize.define('brand', {
    name: {
        type: DataTypes.STRING,        
        unique: {
            msg: "Brand name already exists"
        },
        allowNull: false,
        validate: {
            notNull:{
                msg:'Brand name is required'
            },
            len: {
                args: [3, 40],
                msg: "Brand name should be between 3 and 40 characters"
            }
        }
    }
},
{timestamps: false});

module.exports = Brand;