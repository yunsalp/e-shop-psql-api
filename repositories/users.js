const User = require('../models/user');
const Address = require('../models/address');
const Role = require('../models/role');
const sequelize = require('../config/db');

let queryOption = {
    attributes: {exclude: ['address_id']},
    include: [
        {model: Address, attributes: {exclude: ['id']}},
        {model: Role, attributes: {exclude: ['id']}, through: {attributes: []}}
    ]
};

const getAllUsers = async () => {
    const users = await User.findAll(queryOption);
    return users;
}

const getUserById = async (id) => {
    const user = await User.findByPk(id, queryOption);
    return user;
}

const getUserByUsername = async (username) => {
    const user = await User.findOne({where: {username: username}, 
                                        attributes:['full_name', 'username', 'password']});
    return user;
}

const getUserRolesByUserId = async (userid) => {
    const user = await User.findByPk(userid, {
                    attributes: [], 
                    include: {model: Role, attributes: {exclude: ['id']}, through: {attributes: []}}
                });
    return user;
}

const createUser = async (data) => {
    const result = await sequelize.transaction(async (t) => {
        let user = await User.create(data, {include: Address, transaction: t});
        if (user !== null) {            
            for (let item of data.roles) {
                const role = await Role.findOne({where: {name: item}});
                await user.addRole(role, {transaction: t});
            }
        }
        let queryOptionLocal = {...queryOption};
        queryOptionLocal.transaction = t;
        user = await User.findByPk(user.id, queryOptionLocal);
        return user;
    });
    return result;
}

const updateUser = async (id, data) => {
    const result = await sequelize.transaction(async (t) => {
        let user, rowsUpdated, userDataExists
        userDataExists = false;        
        for (let prop in data) {
            if ((prop != "address") && (prop != "roles")) {
                userDataExists = true
                break;
            }
        }
        if (userDataExists) {
            [rowsUpdated, [user]] = await User.update(data, {where: {id}, returning: true, transaction: t});
        } else {
            user = await User.findByPk(id);
        }        
        if (data.address !== undefined) {
            rowsUpdated = await Address.update(data.address, {where: {id: user.address_id}, transaction: t});
        }
        if (data.roles !== undefined) {
            await user.setRoles([], {transaction: t});
            for (let item of data.roles) {
                const role = await Role.findOne({where: {name: item}});
                await user.addRole(role, {transaction: t});
            }
        }    
        let queryOptionLocal = {...queryOption};
        queryOptionLocal.transaction = t;
        user = await User.findByPk(user.id, queryOptionLocal);
        return user;
    });
    return result;
}

const deleteUser = async (id) => {
    let user = await User.findByPk(id);
    if (user !== null) {
        const address_id = user.address_id;
        await sequelize.transaction(async (t) => {
            await user.destroy({transaction: t});
            await Address.destroy({where:{id:address_id}, transaction: t});
        });
    }
    return user;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserRolesByUserId,
    createUser,
    updateUser,
    deleteUser
}