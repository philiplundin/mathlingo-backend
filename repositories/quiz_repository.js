class QuizRepository {
    constructor(daoQuiz) {
        this.daoQuiz = daoQuiz;
    }


    // createTable() {
    //     const sql = `CREATE TABLE quiz (id INTEGER PRIMARY KEY, category TEXT, type TEXT, difficulty TEXT, question TEXT, correct_answer TEXT, incorrect_answers TEXT)`
    //     return this.daoQuiz.run(sql);
    // }


    async get(id) {
        let quiz = await this.daoQuiz.get(
            `SELECT id, category, difficulty, question, correct_answer FROM quiz WHERE id = ?`,
            [id]);
        console.log(quiz)
        return quiz;
    }

    getAll(){
        return this.daoQuiz.all('select * from quiz')
    }

}
module.exports = QuizRepository;