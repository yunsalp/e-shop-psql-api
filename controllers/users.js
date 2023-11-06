const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const usersRepository = require('../repositories/users');
const {createJwt} = require('../utils/jwtHelper');
const {hashPassword, compareWithHashedPassword} = require('../utils/passwordHelper');

const getAllUsers = asyncHandler(async (req, res, next) => {
    const result = await usersRepository.getAllUsers();
    res.status(200).json(result);
});

const getUserById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await usersRepository.getUserById(id);
    if (result == null) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const capitalize = (string) => {    
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const processInputData = (data, operation) => {
    if (data.password !== undefined) {
        if (data.password.length < 6) {
            throw new ErrorResponse("Password must be at least 6 characters long", 400);
        } else {
            data.password = hashPassword(data.password);
        }
    }
    let errorRoles = false;
    if (operation == 'create') {
        if (data.roles === undefined || data.roles.length <=0) {
            errorRoles = true;        
        }        
    } else { //'update'
        if (data.roles !== undefined && data.roles.length <=0) {  //CHECK LINE gives ERROR if no "roles"
            errorRoles = true;        
        }
    }
    //Common
    if (!(errorRoles) && (data.roles !== undefined)) {
        for (let i = 0; i < data.roles.length; i++) {
            data.roles[i] = capitalize(data.roles[i]);
            if (!(['Admin', 'Customer'].includes(data.roles[i]))) {
                errorRoles = true
                break;
            }
        }
    }
    if (errorRoles){
        msg = "The user must have a valid role (either 'Admin' or 'Customer' or both only)"
        throw new ErrorResponse(msg, 400);
    }    
    if (data.gender !== undefined) {
        data.gender = capitalize(data.gender);
    }
    return data;
}

const createUser = asyncHandler(async (req, res, next) => {
    let data = req.body;
    data = processInputData(data, 'create')
    const result = await usersRepository.createUser(data);
    if (result.id) {
        const token = createJwt(result.id);
        res.status(201).json({user: result, token: token});
    }    else {
        res.status(500).json({message: 'Unexpected error, User signup failed'});
    } 
});

const updateUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let data = req.body;
    data = processInputData(data, 'update')
    const result = await usersRepository.updateUser(id, data);
    if (result == null) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await usersRepository.deleteUser(id);
    if (result == null || result < 1) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json({message: 'User deleted successfully'});
});

const login = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body;
    const user = await usersRepository.getUserByUsername(username);
    if (user === null || password === undefined) {
        return next(new ErrorResponse(`Invalid credentials`, 400));
    }
    const isValid = compareWithHashedPassword(password, user.password);
    if (isValid) {
        const token = createJwt(user._id);    
        return res.status(200).json({message: 'Logged in successfully', 
                                    user: {full_name: user.full_name, username: username}, token: token});
    }
    next(new ErrorResponse(`Invalid credentials`, 400));    
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
}