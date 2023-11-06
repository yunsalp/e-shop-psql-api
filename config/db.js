const dbConfig = {
    user: 'eshop_user',
    password: 'upCode@2023',
    host: 'localhost',
    port: 5432,
    database: 'eshop'  
}

const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.database, dbConfig.user, dbConfig.password, {
        host: dbConfig.host, dialect: 'postgres'
});

module.exports = sequelize;