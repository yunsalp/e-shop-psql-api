const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Address = sequelize.define('address', {
    address_line1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg:'address_line1 is required'
            }
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg:'city is required'
            }
        }
    },
    state: DataTypes.STRING,
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg:'country is required'
            }
        }
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull:{
                msg:'pincode is required'
            }
        }
    }
},
{timestamps: false});

module.exports = Address;