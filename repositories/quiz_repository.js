class QuizRepository {
    constructor(daoQuiz) {
        this.daoQuiz = daoQuiz;
    }

    async get(id) {
        let quiz = await this.daoQuiz.get(
            `SELECT id, category, difficulty, question, correct_answer FROM quiz WHERE id = ?`,
            [id]);
        console.log(quiz)
        return quiz;
    }
    async getUserId(user_id) {
        let results_easy = await this.dao.get(
            `SELECT * FROM results_easy WHERE user_id = ?`,
            [user_id]);
        return results_easy;
    }

    async getAll(){
        return this.daoQuiz.all('select * from quiz')
    }


    async getAllResultsEasy() {
        return this.daoQuiz.all('select * from results_easy')
    }

    async getResultEasy(id) {
        let results_easy = await this.daoQuiz.get(
            `SELECT * FROM results_easy WHERE user_id = ?`,
            [id]);
        return results_easy;
    }

    async getAllResultsHard() {
        return this.daoQuiz.all('select * from results_hard')
    }

    async getResultHard(id) {
        let results_hard = await this.daoQuiz.get(
            `SELECT * FROM results_hard WHERE id = ?`,
            [id]);
        return results_hard;
    }

    async getAllResultsFinal() {
        return this.daoQuiz.all('select * from results_final')
    }

    async getResultFinal(id) {
        let results_final = await this.daoQuiz.get(
            `SELECT * FROM results_final WHERE id = ?`,
            [id]);
        return results_final;
    }

    async createResultsEasy(data, user) {
        let results_easy = await this.daoQuiz.run(
            `INSERT INTO results_easy(addition, subtraction, multiplication, division, user_id)
            VALUES (?, ?, ?, ?, ?)`,
            [data.addition, data.subtraction,data.multiplication, data.division, user.id]);
        return results_easy.id;
    }

   async updateResultsEasy(data, user) {
        return await this.daoQuiz.run(`UPDATE results_easy SET
            addition = ?,
            subtraction = ?,
            multiplication = ?,
            division = ?
            WHERE user_id = ?`,
            [data.addition, data.subtraction,data.multiplication, data.division, user.id]);
    }
}
module.exports = QuizRepository;