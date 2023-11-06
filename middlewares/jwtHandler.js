const {verifyToken} = require('../utils/jwtHelper');
const usersRepository = require('../repositories/users');

const verifyTokenHandler = async (req, res, next) => {
    let token = req.headers['authorization'];
    if (token && token.includes('Bearer')) {
        try {
            const result = await verifyToken(token);
            const user = await usersRepository.getUserById(result.userid);
            if (user === null) {
                //JWT returns as valid, but do not belong to a valid user in DB 
                return res.status(401).json({message: 'Invalid token'});
            }
            req.userid = result.userid;
            next();
        } catch(error) {
            res.status(401).json({message: 'Invalid token'});
        }
    } else {
        res.status(401).json({message: 'No token provided'});
    }
}

const verifyRoles = (roles) => {
    return async (req, res, next) => {
        const user = await usersRepository.getUserRolesByUserId(req.userid);
        let hasRole = false;
        for (let userRole of user.roles) {
            if(roles.includes(userRole.name)) {
                hasRole = true;
                break;
            }
        }
        if (hasRole) {
            return next();
        }
        res.status(403).json({message: 'User does not have permission'});
    }    
}

module.exports = {
    verifyTokenHandler,
    verifyRoles
}