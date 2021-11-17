require('dotenv').config();
const Promise = require('bluebird');
const QuizRepository = require('../repositories/quiz_repository');
const AppDao = require('../database/database');
const daoQuiz = new AppDao(process.env.DB_URL)
const quizRepo = new QuizRepository(daoQuiz)

async function get(id) {
    let quiz = await quizRepo.get(id);
    return quiz;
}

async function getAll(){
    return quizRepo.getAll();
}

async function getResultsEasy(id) {
    let results = await quizRepo.getResultEasy(id);
    return results;
}

async function getAllResultsEasy(){
    return quizRepo.getAllResultsEasy();
}

async function getResultsHard(id) {
    let results = await quizRepo.getResultHard(id);
    return results;
}

async function getAllResultsHard(){
    return quizRepo.getAllResultsHard();
}

async function getResultsFinal(id) {
    let results = await quizRepo.getResultFinal(id);
    return results;
}

async function getAllResultsFinal(){
    return quizRepo.getAllResultsFinal();
}

async function createResultsEasy(user, results_easy) {
    return quizRepo.createResultsEasy(user, results_easy);
}

module.exports = {get, getAll, getResultsEasy, getAllResultsEasy,
    getResultsHard, getAllResultsHard,
    getResultsFinal, getAllResultsFinal,
    createResultsEasy}
