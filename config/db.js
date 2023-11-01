const dbConfig = {
    user: 'eshop_user',
    password: 'upCode@2023',
    host: 'localhost',
    port: 5432,
    database: 'eshop'  
}

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.database, dbConfig.user, dbConfig.password, {
        host: dbConfig.host, dialect: 'postgres'
});

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

module.exports = sequelize;