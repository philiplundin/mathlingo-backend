const Promise = require('bluebird');
const QuizRepository = require('../repositories/quiz_repository');
const AppDao = require('../database/database');

const daoQuiz = new AppDao(process.env.DB_URL);
const quizRepo = new QuizRepository(daoQuiz)

async function get(id) {
    let quiz = await quizRepo.get(id);
    return quiz;
}

async function getAll(){
    return quizRepo.getAll();
}

module.exports = {get, getAll}
