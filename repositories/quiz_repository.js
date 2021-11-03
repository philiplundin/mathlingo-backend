class QuizRepository {
    constructor(daoQuiz) {
        this.daoQuiz = daoQuiz;
    }


    createTable() {
        const sql = `CREATE TABLE quiz (id INTEGER PRIMARY KEY, question TEXT, answer TEXT)`
        return this.daoQuiz.run(sql);
    }


    async get(id) {
        let quiz = await this.daoQuiz.get(
            `SELECT id, question, answer FROM quiz WHERE id = ?`,
            [id]);
        return quiz;
    }
}
module.exports = QuizRepository;