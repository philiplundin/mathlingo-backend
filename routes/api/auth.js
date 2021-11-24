const express = require('express');
const {JsonWebTokenError} = require('jsonwebtoken');
const db = require("../../database/database.js");
const UserService = require('../../services/user_service');
const QuizService = require('../../services/quiz_service');
const jwt = require('jsonwebtoken');
const router = express.Router();

// ******************************************* User endpoints **************************************************

router.post("/login", async (req, res, next) => {
    let errors = [];
    if (!req.body.email) {
        errors.push("No email");
    }
    if (!req.body.password) {
        errors.push("No Password");
    }
    if (errors.length != 0) {
        res.status(400).json({errors});
    } else {
        let tokens = await UserService.login(req.body.email, req.body.password);
        if (!tokens) {
            res.status(403).send("Wrong Email or Password")
        }
        try {
            let accessToken = tokens[0];
            let refreshToken = tokens[1];
            res.send({accessToken, refreshToken});
        } catch (err) {
            console.log(err);
        }

    }
});

router.post("/logout", async (req, res, next) => {
    if (!req.body.accessToken) {
        res.status(400).json("Invalid Token");
    } else {
        try {
            let user = await UserService.logout(req.body.accessToken);
            if (!user) {
                res.status(401).send('Failed to Sign Out');
            } else {
                res.send('Signed out ' + user.name);
            }
        } catch (err) {
            console.log(err);

        }
    }
});

router.post("/removeAccount", async (req, res, next) => {
    if (!req.body.accessToken) {
        res.status(403).send("Wrong Email or Password")
    }

    try {
        let tokens = await UserService.deleteUser(req.body.accessToken, req.body.refreshToken);
        res.status(204)
    } catch (err) {
        console.log(err);

    }
});

router.put("/updateUser", async (req, res, next) => {
    if (!req.body.accessToken) {
        res.status(403).send("Wrong Email or Password")
    }
    try {
        let updatedUserTokens = await UserService.updateUser(req.body.accessToken, req.body.refreshToken, req.body.newPassword)
        res.status(204).send(updatedUserTokens);
    } catch (err) {
        console.log(err);

    }
});


router.post("/signup", async (req, res, next) => {
    let errors = [];
    if (!req.body.name) {
        errors.push("No Username");
    }
    if (!req.body.email) {
        errors.push("No Email");
    }
    if (!req.body.password) {
        errors.push("No Password");
    }
    if (errors.length != 0) {
        res.status(400).json({errors});
    } else {
        try {
            let newUser = await UserService.addUser(req.body.name, req.body.email, req.body.password);
            if (newUser != null) {
                res.send(newUser);
            } else {
                res.status(403).send("Email already registered")
            }
        } catch (err) {
            console.log(err);

        }
    }
});

router.post("/available", async (req, res, next) => {
    if (!req.body.email) {
        res.status(400).json("No Email");
    } else {
        try {
            let available = await UserService.available(req.body.email);
            res.send(available);
        } catch (err) {
            console.log(err);

        }
    }
});


// ******************************************* Quiz endpoints **************************************************


router.get('/quiz', async (req, res, next) => {
    try {
        let quiz = await QuizService.getAll();
        res.json({
            quiz
        });
    } catch (err) {
        console.log(err);

    }
});

router.get('/quiz/:id', async (req, res, next) => {
    console.log("GET request called");
    try {
        let quiz = await QuizService.get(req.params.id);
        res.send(quiz);
    } catch (err) {
        console.log(err);

    }
});


// ******************************************* Quiz_easy endpoints **************************************************


router.get('/results_easy/:id', async (req, res, next) => {
    console.log("GET results_easy request called");
    try {
        let results_easy = await QuizService.getResultsEasy(req.params.id);
        res.send(results_easy);
    } catch (err) {
        console.log(err);

    }
});

router.get('/results_easy', async (req, res, next) => {

    try {
        let results_easy = await QuizService.getAllResultsEasy();
        res.json({
            results_easy
        });
    } catch (err) {
        console.log(err);

    }
});

router.get('/results_easy_token/:accessToken', async (req, res, next) => {
    console.log("GET results_easy request called");
    try {
        let results_easy = await QuizService.getResultsEasyToken(req.params.accessToken);
        res.send(results_easy);
    } catch (err) {
        console.log(err);

    }
});


router.post("/results_easy", async (req, res, next) => {

    if (!req.body) {
        res.status(400).send("Needs body")
    } else {
        try {
            let result = await QuizService.createResultsEasy(req.body);
            res.status(204).send(await result);
        } catch (err) {
            console.log(err);

        }
    }
});


// ******************************************* Quiz_hard endpoints **************************************************


router.get('/results_hard/:id', async (req, res, next) => {
    console.log("GET results_hard request called");
    try {
        let results_hard = await QuizService.getResultsHard(req.params.id);
        res.send(results_hard);
    } catch (err) {
        console.log(err);

    }
});

router.get('/results_hard', async (req, res, next) => {
    try {
        let results_hard = await QuizService.getAllResultsHard();
        res.json({
            results_hard
        });
    } catch (err) {
        console.log(err);

    }
});


router.get('/results_hard_token/:accessToken', async (req, res, next) => {
    console.log("GET results_hard request called");
    try {
        let results_hard = await QuizService.getResultsHardToken(req.params.accessToken);
        res.send(results_hard);
    } catch (err) {
        console.log(err);

    }
});


router.post("/results_hard", async (req, res, next) => {

    if (!req.body) {
        res.status(400).send("Needs body")
    } else {
        try {
            let result = await QuizService.createResultsHard(req.body);
            res.status(204).send(await result);
        } catch (err) {
            console.log(err);

        }
    }
});


// ******************************************* Quiz_final endpoints **************************************************


router.get('/results_final/:id', async (req, res, next) => {
    console.log("GET results_final request called");
    try {
        let results_final = await QuizService.getResultsFinal(req.params.id);
        res.send(results_final);
    } catch
        (err) {
        console.log(err);

    }
});

router.get('/results_final', async (req, res, next) => {
    console.log("GET results_final request for all called");
    try {
        let results_final = await QuizService.getAllResultsFinal();
        res.json({
            results_final
        });
    } catch (err) {
        console.log(err);

    }
});

router.get('/results_final_token/:accessToken', async (req, res, next) => {
    console.log("GET results_final with token request called");
    try {
        let results_final = await QuizService.getResultsFinalToken(req.params.accessToken);
        res.send(results_final);
    } catch (err) {
        console.log(err);

    }
});


router.post("/results_final", async (req, res, next) => {

    if (!req.body) {
        res.status(400).send("Needs body")
    } else {
        try {
            let result = await QuizService.createResultsFinal(req.body);
            res.status(204).send(await result);
        } catch (err) {
            console.log(err);

        }
    }
});

//********************************************************************************************************
module.exports = router;
