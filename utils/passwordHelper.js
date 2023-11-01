const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hashPassword(password) {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compareWithHashedPassword(plainPassword, hashedPassword) {
    const isMatching = bcrypt.compareSync(plainPassword, hashedPassword);
    return isMatching;
}

module.exports = {
    hashPassword,
    compareWithHashedPassword
}