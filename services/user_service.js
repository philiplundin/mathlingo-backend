require('dotenv').config();
const Promise = require('bluebird');
const UserRepository = require('../repositories/user_repository');
const AppDao = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dao = new AppDao('C:/Users/dator/WebstormProjects/mathlingo/auth/database/user.db')
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


async function login(email, password) {
    if (await checkPassword(email, password)) {
        user = await getUserByEmail(email);
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        return accessToken;
    }
    else {
        return null;
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
  }

module.exports = {getUserByEmail, addUser, login}
