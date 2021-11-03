const Promise = require('bluebird');
const QuizRepository = require('../repositories/quiz_repository');
const AppDao = require('../database/database');

const daoQuiz = new AppDao('C:/Users/farru/WebstormProjects/mathlingo-backend-auth/database/user.db');
const quizRepo = new QuizRepository(daoQuiz)

async function get(id) {
    let quiz = await quizRepo.get(id);
    return quiz;
}

module.exports = {get}
