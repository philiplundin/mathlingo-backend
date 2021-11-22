class QuizRepository {
    constructor(daoQuiz) {
        this.daoQuiz = daoQuiz;
    }


    // ********************************************Quiz*********************************************************
    async get(id) {
        let quiz = await this.daoQuiz.get(
            `SELECT id, category, difficulty, question, correct_answer
             FROM quiz
             WHERE id = ?`,
            [id]);
        console.log(quiz)
        return quiz;
    }

    async getUserId(user_id) {
        let results_easy = await this.dao.get(
            `SELECT *
             FROM results_easy
             WHERE user_id = ?`,
            [user_id]);
        return results_easy;
    }

    async getAll() {
        return this.daoQuiz.all('select * from quiz')
    }


    // ********************************************Results Easy*********************************************************

    async getAllResultsEasy() {
        return this.daoQuiz.all('select * from results_easy')
    }

    async getResultEasy(id) {
        let results_easy = await this.daoQuiz.get(
            `SELECT *
             FROM results_easy
             WHERE user_id = ?`,
            [id]);
        return results_easy;
    }

    async createResultsEasy(data, user) {
        let results_easy = await this.daoQuiz.run(
            `INSERT INTO results_easy(addition, subtraction, multiplication, division, user_id)
             VALUES (?, ?, ?, ?, ?)`,
            [data.addition, data.subtraction, data.multiplication, data.division, user.id]);
        return results_easy.id;
    }

    async updateResultsEasy(data, user) {
        return await this.daoQuiz.run(`UPDATE results_easy
                                       SET addition       = ?,
                                           subtraction    = ?,
                                           multiplication = ?,
                                           division       = ?
                                       WHERE user_id = ?`,
            [data.addition, data.subtraction, data.multiplication, data.division, user.id]);
    }


    // ********************************************Results Hard*********************************************************


    async getAllResultsHard() {
        return this.daoQuiz.all('select * from results_hard')
    }

    async getResultHard(id) {
        let results_hard = await this.daoQuiz.get(
            `SELECT *
             FROM results_hard
             WHERE user_id = ?`,
            [id]);
        return results_hard;
    }

    async createResultsHard(data, user) {
        let results_hard = await this.daoQuiz.run(
            `INSERT INTO results_hard(addition, subtraction, multiplication, division, user_id)
             VALUES (?, ?, ?, ?, ?)`,
            [data.addition, data.subtraction, data.multiplication, data.division, user.id]);
        return results_hard.id;
    }

    async updateResultsHard(data, user) {
        return await this.daoQuiz.run(`UPDATE results_hard
                                       SET addition       = ?,
                                           subtraction    = ?,
                                           multiplication = ?,
                                           division       = ?
                                       WHERE user_id = ?`,
            [data.addition, data.subtraction, data.multiplication, data.division, user.id]);
    }


    // ********************************************Results Final*********************************************************


    async getAllResultsFinal() {
        return this.daoQuiz.all('select * from results_final')
    }

    async getResultFinal(id) {
        let results_final = await this.daoQuiz.get(
            `SELECT *
             FROM results_final
             WHERE user_id = ?`,
            [id]);
        return results_final;
    }

    async createResultsFinal(data, user) {
        let results_final = await this.daoQuiz.run(
            `INSERT INTO results_final(final_easy, final_hard, user_id)
             VALUES (?, ?, ?)`,
            [data.final_easy, data.final_hard, user.id]);
        return results_final.id;
    }

    async updateResultsFinal(data, user) {
        return await this.daoQuiz.run(
            `UPDATE results_final
             SET final_easy = ?,
                 final_hard = ?
             WHERE user_id = ?`,
            [data.final_easy, data.final_hard, user.id]);
    }
}
//************************************************************************************************
module.exports = QuizRepository;