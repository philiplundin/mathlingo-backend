class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, password TEXT, email TEXT, token TEXT)`
        return this.dao.run(sql);
    }

    async create(name, password, email) {
        let newUser = await this.dao.run(
          `INSERT INTO user (name, password, email)
            VALUES (?, ?, ?)`,
          [name, password, email]);
        return newUser.id;
    }

    async delete(user) {
    await this.dao.run(
            `DELETE FROM user WHERE id = ?`,
            [user.id]);
    console.log("The User has been deleted" + user);
    }
    
    async get(id) {
      let user = await this.dao.get(
        `SELECT id, name, email FROM user WHERE id = ?`,
        [id]);
      return user;
    }


    async getToken(id) {
      let token = await this.dao.get(
        `SELECT token FROM user WHERE id = ?`,
        [id]);
        return token.token;
    }

    async search(email) {
      let user = await this.dao.get(
        `SELECT id, name, email FROM user WHERE email = ?`,
        [email]);
      return user;
    }

    async getPasswordHashByEmail(email) {
      let user = await this.dao.get(
        `SELECT password FROM user WHERE email = ?`,
        [email]);
        if (user) {
          return user.password;
        }
        else return null;
    }

    async updateRefreshToken(id, token) {
      await this.dao.run(`UPDATE user SET token = ? WHERE id = ?`, [token, id]);
    }


    async matchTokenHash(hashedToken) {
      let token = await this.dao.get(
        `SELECT token FROM user WHERE token = ?`,
        [hashedToken]);
        return token;
    }
}

module.exports = UserRepository;
