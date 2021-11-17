const sqlite3 = require('sqlite3').verbose()
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

class AppDao {
    constructor(DBSOURCE) {
        this.db = new sqlite3.Database(DBSOURCE, (err) => {
            if (err) {
                console.log("Could not connect to database", err);
            }
            else {
                console.log('Connected to database');
                this.db.run(`CREATE TABLE quiz (id INTEGER PRIMARY KEY, category TEXT, difficulty TEXT, question TEXT, correct_answer TEXT)`, (err) => {
                    if (err) {
                        // Table already created
                        console.log('Schema Exists');
                    } else {
                        console.log('New Schema - QUIZ');
                        let insert = 'INSERT INTO quiz (category, difficulty, question, correct_answer) VALUES (?,?,?,?)'
                        this.db.run(insert, ["Addition", "medium", "1 + 1", "2"])
                        this.db.run(insert, ["Addition", "medium", "2 + 2", "4"])
                        this.db.run(insert, ["Addition", "medium", "3 + 3", "6"])

                    }
                }),
                    this.db.run(`CREATE TABLE results_easy (id INTEGER PRIMARY KEY, 
                        addition INTEGER,
                         subtraction INTEGER,
                         multiplication INTEGER,
                         division INTEGER,
                          user_id INTEGER)`, (err) => {
                        if (err) {
                            // Table already created
                            console.log('Schema Exists');
                        } else {
                            console.log('New Schema - QUIZ_results_easy');

                        }
                    }),
                    this.db.run(`CREATE TABLE results_hard (id INTEGER PRIMARY KEY, 
                        addition INTEGER,
                         subtraction INTEGER,
                         multiplication INTEGER,
                         division INTEGER,
                          user_id INTEGER FOREIGN KEY)`, (err) => {
                        if (err) {
                            // Table already created
                            console.log('Schema Exists');
                        } else {
                            console.log('New Schema - QUIZ_results_hard');

                        }
                    }),
                    this.db.run(`CREATE TABLE results_final (id INTEGER PRIMARY KEY, 
                        addition INTEGER,
                         subtraction INTEGER,
                         multiplication INTEGER,
                         division INTEGER,
                          user_id INTEGER)`, (err) => {
                        if (err) {
                            // Table already created
                            console.log('Schema Exists');
                        } else {
                            console.log('New Schema - QUIZ_results_final');

                        }
                    }),
                this.db.run(`CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, password TEXT, email TEXT, token TEXT)`, (err) => {
                    if (err) {
                        // Table already created
                        console.log('Schema Exists');
                    } else {
                        console.log('New Schema - USER');
                        let insert = 'INSERT INTO user (name, password, email) VALUES (?,?,?)'
                        this.db.run(insert, ["Adam Adamsson", bcrypt.hashSync('adamadam123', 11), "adam@adamsson.se"])
                        this.db.run(insert, ["Bertil Bertilsson", bcrypt.hashSync('bertilbertil123', 11), "bertil@bertilsson.se"])
                        this.db.run(insert, ["David Davidsson", bcrypt.hashSync('daviddavid123', 11), "david@davidsson.se"])
                    }
                });
            }
        })
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    console.log('Error with query: ' + sql);
                    console.log(err);
                    reject(err)
                }
                else {
                    resolve({id : this.lastID})
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.get(sql, params, (err, result) => {
            if (err) {
              console.log('Error running sql: ' + sql)
              console.log(err)
              reject(err)
            } else {
                resolve(result)
            }
          })
        })
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.all(sql, params, (err, rows) => {
            if (err) {
              console.log('Error running sql: ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve(rows)
            }
          })
        })
      }

}

module.exports = AppDao

