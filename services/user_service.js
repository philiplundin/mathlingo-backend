require('dotenv').config();
const Promise = require('bluebird');
const UserRepository = require('../repositories/user_repository');
const AppDao = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Console = require("console");

const dao = new AppDao(process.env.DB_URL)
const userRepo = new UserRepository(dao)

async function getUserByEmail(email) {
    let user = await userRepo.search(email);
    return user;
}

async function checkPassword(email, password) {

    let hash = await userRepo.getPasswordHashByEmail(email);
    if (!hash) {
        return false;
    }
    else {
        return (bcrypt.compareSync(password, hash));
    }
}

async function newAccessToken(token) {
    try {
        let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let dbToken = await userRepo.getToken(user.id);
        
        if (token == dbToken) {
            const accessToken = generateAccessToken({ id: user.id, name: user.name, email: user.email})
            return accessToken;
        }
        else {
            return null;
        }
    } catch (TokenExpiredError){
        console.log("Invalid Token!")
        return null;
    }
}

async function addUser(name, email, password) {
    let existing = await getUserByEmail(email);
   
    if (!existing) {
        let hash = await bcrypt.hash(password, 11);
        let id = await userRepo.create(name, hash, email);
        let new_user = await userRepo.get(id);
        return new_user;
    }
    else return null;
}

async function updateUser(accessToken, refreshToken, newPassword) {
    try {
        let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!user) {
            console.log("Invalid Token!")
            return null;
        }
        let hash = await bcrypt.hash(newPassword, 11);
        await userRepo.update(user, hash);
        let updatedUserTokens = login(user.email, newPassword);
        return updatedUserTokens;
    } catch (TokenExpiredError){
        console.log("Invalid Token!")
        return null;
    }

}

async function deleteUser(accessToken) {
    try {
        let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!user) {
            console.log("Invalid Token!")
            return null;
        }
        await userRepo.delete(user);
        return user;
    } catch (TokenExpiredError){
        console.log("Invalid Token!")
        return null;
    }
}


async function login(email, password) {

    if (await checkPassword(email, password)) {
        const user = await getUserByEmail(email);

        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        await userRepo.updateRefreshToken(user.id, refreshToken);
        return [accessToken, refreshToken];
    }
    else {
        return null;
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1000m' });
}

async function logout(accessToken) {
    try {

        let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!user) {
            console.log("Invalid Token!")
            return null;
        }
        await userRepo.updateRefreshToken(user.id, null);
        return user;
    } catch (TokenExpiredError){
        console.log("Invalid Token!")
        return null;
    }
}

async function available(email) {
    let user = await getUserByEmail(email);
    if(user) {
        return false;
    }
    else return true;
}

module.exports = {getUserByEmail, addUser, login, newAccessToken, logout, deleteUser, updateUser, available}
