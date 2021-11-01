const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require("../../database/database.js");
const UserService = require('../../services/user_service');
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
        accessToken = await UserService.login(req.body.email, req.body.password);
        if (!accessToken) {
            res.status(403).send("Wrong email or password")
        }
        res.send({accessToken: accessToken});
    }
});

router.post("/signup", async (req, res, next) => {
    let errors=[];
    if (!req.body.name) {
        errors.push("No Username");
    } if(!req.body.email) {
        errors.push("No Email");
    } if (!req.body.password) {
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

module.exports = router;
