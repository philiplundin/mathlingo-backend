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

    async getAll(){
        return this.daoQuiz.all('select * from quiz')
    }


    async getAllResultsEasy() {
        return this.daoQuiz.all('select * from results_easy')
    }

    async getResultEasy(id) {
        let results_easy = await this.daoQuiz.get(
            `SELECT * FROM results_easy WHERE id = ?`,
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

    async createResultsEasy(data) {
        let results_easy = await this.daoQuiz.run(
            `INSERT INTO results_easy(addition, subtraction, multiplication, division, user_id)
            VALUES (?, ?, ?, ?, ?)`,
            [data.addition, data.subtraction,data.multiplication, data.division, data.user]);
        return results_easy.id;
    }

    // async updateResultEasy(user, results_easy) {
    //     await this.dao.run(`UPDATE results_easy SET password = ? WHERE id = ?`,
    //         [hash,user.id]);
    //     console.log("The results for easy has been Updated" + user);
    // }
}
module.exports = QuizRepository;