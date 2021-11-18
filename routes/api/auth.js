const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require("../../database/database.js");
const UserService = require('../../services/user_service');
const QuizService = require('../../services/quiz_service');
const jwt = require('jsonwebtoken');
const router = express.Router();

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
    }
    else {
        let tokens = await UserService.login(req.body.email, req.body.password);
        if (!tokens) {
            res.status(403).send("Wrong Email or Password")
        }
        let accessToken = tokens[0];
        let refreshToken = tokens[1];
        res.send({accessToken, refreshToken});
    }
});

router.post("/logout", async (req, res, next) => {
    if (!req.body.accessToken) {
        res.status(400).json("Invalid Token");
    }
    else {
        let user = await UserService.logout(req.body.accessToken);

        if (!user) {
            res.status(401).send('Failed to Sign Out');
        }
        else {
            res.send('Signed out ' + user.name);
        }
    }
});

router.post("/removeAccount", async (req, res, next) => {
    let tokens = await UserService.deleteUser(req.body.accessToken, req.body.refreshToken);
    if (!req.body.accessToken) {
        res.status(403).send("Wrong Email or Password")
    }
    res.status(204)
});

router.put("/updateUser", async (req, res, next) => {
    let updatedUserTokens = await UserService.updateUser(req.body.accessToken, req.body.refreshToken, req.body.newPassword)
    if (!req.body.accessToken) {
        res.status(403).send("Wrong Email or Password")
    }
    res.status(204).send(updatedUserTokens);
});


router.post("/signup", async (req, res, next) => {
    let errors=[];
    if (!req.body.name) {
        errors.push("No Username");
    }
    if(!req.body.email) {
        errors.push("No Email");
    }
    if (!req.body.password) {
        errors.push("No Password");
    }
    if (errors.length != 0) {
        res.status(400).json({errors});
    }
    else {
        let newUser = await UserService.addUser(req.body.name, req.body.email, req.body.password);
        if (newUser != null) {
            res.send(newUser);
        }
        else {
            res.status(403).send("Email already registered")
        }
    }
});

router.post("/available", async (req, res, next) => {
    if(!req.body.email) {
        res.status(400).json("No Email");
    }
    else {
        let available = await UserService.available(req.body.email);
        res.send(available);
    }
});

router.get('/quiz', async (req, res, next) => {
    let quiz = await QuizService.getAll();
    res.json({
            quiz
    });
});

router.get('/quiz/:id', async (req, res, next) => {
    console.log("GET request called");
    let quiz = await QuizService.get(req.params.id);
    res.send(quiz);
});

router.get('/results_easy/:id', async (req, res, next) => {
    console.log("GET results_easy request called");
    let results_easy = await QuizService.getResultsEasy(req.params.id);
    res.send(results_easy);
});

router.get('/results_easy', async (req, res, next) => {
    let results_easy = await QuizService.getAllResultsEasy();
    res.json({
        results_easy
    });
});

router.get('/results_hard/:id', async (req, res, next) => {
    console.log("GET results_hard request called");
    let results_hard = await QuizService.getResultsHard(req.params.id);
    res.send(results_hard);
});

router.get('/results_hard', async (req, res, next) => {
    let results_hard = await QuizService.getAllResultsHard();
    res.json({
        results_hard
    });
});

router.get('/results_final/:id', async (req, res, next) => {
    console.log("GET results_final request called");
    let results_final = await QuizService.getResultsFinal(req.params.id);
    res.send(results_final);
});

router.get('/results_final', async (req, res, next) => {
    let results_final = await QuizService.getAllResultsFinal();
    res.json({
        results_final
    });
});

router.post("/results_easy", async (req, res, next) => {
    
    //TODO: ADD MORE CHECKS!
    if (!req.body) {
        res.status(400).send("Needs body")
    }
    else {
        let result = await QuizService.createResultsEasy(req.body);
        res.status(204).send(await result);
    }
});

// router.post("/token", async (req, res) => {
//     if (req.body.token == null) {
//         res.status(401);
//     }
//     const refreshToken = req.body.token;
//     const newAccessToken = await UserService.newAccessToken(refreshToken);
//     if (!newAccessToken) {
//         res.status(401).send("Unable to obtain access token")
//     }
//     else {
//         res.send(newAccessToken);
//     }
//
// })

module.exports = router;
