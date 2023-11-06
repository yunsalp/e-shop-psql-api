const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Role = sequelize.define('role', {
    name: {
        type: DataTypes.STRING,        
        unique: {
            msg: "Role name already exists"
        },
        allowNull: false,
        validate: {
          isIn: [['Admin', 'Customer']]
        }
    }
},
{timestamps: false});

module.exports = Role;