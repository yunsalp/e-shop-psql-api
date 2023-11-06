const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg:'Full name is required'
            },
            len: {
                args: [3, 40],
                msg: "Full name should be between 3 and 100 characters"
            }
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Male', 'Female']]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail : {
                msg:'Valid email is required'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg:'Phone number is required'
            },
        }
    },
    username: {
        type: DataTypes.STRING,   
        unique: {
            msg: "username already exists"
        },
        allowNull: false,
        validate: {
            notNull:{
                msg:'username is required'
            },
            len: {
                args: [3, 30],
                msg: "username should be between 3 and 30 characters"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg:'password is required'
            }
        }
    }
},
{timestamps: false});

module.exports = User;