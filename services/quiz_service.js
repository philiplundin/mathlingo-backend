require('dotenv').config();
const Promise = require('bluebird');
const QuizRepository = require('../repositories/quiz_repository');
const AppDao = require('../database/database');
const jwt = require("jsonwebtoken");
const daoQuiz = new AppDao(process.env.DB_URL)
const quizRepo = new QuizRepository(daoQuiz)


// ********************************************Quiz*********************************************************

async function get(id) {
    let quiz = await quizRepo.get(id);
    return quiz;
}

async function getAll() {
    return quizRepo.getAll();
}


// ********************************************Quiz Easy*********************************************************



async function getResultsEasy(id) {
    let results = await quizRepo.getResultEasy(id);
    return results;
}

async function getAllResultsEasy() {
    return quizRepo.getAllResultsEasy();
}



async function getResultsEasyToken(accessToken) {
    let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    let results = await quizRepo.getResultEasy(user.id);
    return results;
}

async function createResultsEasy(data) {

    let user = jwt.decode(data.accessToken, process.env.ACCESS_TOKEN_SECRET);

    let userID = await getResultsEasy(user.id);

    if (!userID) {
        return await quizRepo.createResultsEasy(data, user);
    } else {
        return await quizRepo.updateResultsEasy(data, user);
    }
}


// ********************************************Quiz Hard*********************************************************

async function getResultsHard(id) {
    let results = await quizRepo.getResultHard(id);
    return results;
}

async function getAllResultsHard() {
    return quizRepo.getAllResultsHard();
}


async function getResultsHardToken(accessToken) {
    let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    let results = await quizRepo.getResultHard(user.id);
    return results;
}

async function createResultsHard(data) {

    let user = jwt.decode(data.accessToken, process.env.ACCESS_TOKEN_SECRET);

    let userID = await getResultsHard(user.id);

    if (!userID) {
        return await quizRepo.createResultsHard(data, user);
    } else {
        return await quizRepo.updateResultsHard(data, user);
    }
}


// ********************************************Quiz Final*********************************************************




async function getResultsFinal(id) {
    let results = await quizRepo.getResultFinal(id);
    return results;
}

async function getAllResultsFinal() {
    return quizRepo.getAllResultsFinal();
}


async function getResultsFinalToken(accessToken) {
    let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    let results = await quizRepo.getResultFinal(user.id);
    return results;
}

async function createResultsFinal(data) {

    let user = jwt.decode(data.accessToken, process.env.ACCESS_TOKEN_SECRET);

    let userID = await getResultsFinal(user.id);

    if (!userID) {
        return await quizRepo.createResultsFinal(data, user);
    } else {
        return await quizRepo.updateResultsFinal(data, user);
    }
}




//********************************************************************************************************************

module.exports = {
    get, getAll,
    getResultsEasy, getAllResultsEasy, getResultsEasyToken, createResultsEasy,
    getResultsHard, getAllResultsHard, getResultsHardToken, createResultsHard,
    getResultsFinal, getAllResultsFinal, getResultsFinalToken, createResultsFinal

}
