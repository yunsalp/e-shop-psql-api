var jwt = require('jsonwebtoken');
var SECRET = "biykmpr1582023";

function createJwt(userid) {
    var token = jwt.sign({userid: userid}, SECRET);
    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        const formattedToken = token.replace('Bearer ', '');
        jwt.verify(formattedToken, SECRET, (err, decoded) => {
            if (err) return reject({valid: false, error: err});
            resolve({valid: true, userid: decoded.userid});
        });
    });
}

module.exports = {
    createJwt,
    verifyToken
}