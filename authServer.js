const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');

const swaggerOptions={
    definition:{
        name: 'MathLingo',
        openapi:'3.0.0',
        info:{
            title:'MathLingo Backend API',
            version:'1.0.0',
            description:'Api for MathLingo',
            contact:{
                name:'Farrukh (farrukh.mahmood@iths.se), ' +
                    'Gustav (gustav.jakobsson@iths.se), ' +
                    'Milan (milan.arif@iths.se), ' +
                    'Philip (philip.lundin@iths.se)',
                url:'',
                email:''
            },
            servers:["http://localhost:4000"]
        }
    },
    apis:["authServer.js"]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

// Middleware
app.use(bodyParser.json())
app.use(cors())
const auth = require('./routes/api/auth')
app.use('/auth', auth)

const port = process.env.PORT || 4000


// ******************************************* User's endpoints **************************************************
app.post("/auth/signup");
/**
 * @swagger
 * /auth/signup:
 *  post:
 *   summary: SignUp user.
 *   description: SignUp user.
 */

app.post("/auth/login");
/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: Login user.
 *   description: Login user.
 */

app.post("/auth/logout");
/**
 * @swagger
 * /auth/logout:
 *  post:
 *   summary: Logout user.
 *   description: Logout user.
 */

app.post("/auth/removeAccount");
/**
 * @swagger
 * /auth/removeAccount:
 *  post:
 *   summary: Delete user.
 *   description: Delete user.
 */

app.put("/auth/updateUser");
/**
 * @swagger
 * /auth/updateUser:
 *  put:
 *   summary: Update user.
 *   description: Update user.
 */

app.post("/auth/available");
/**
 * @swagger
 * /auth/available:
 *  post:
 *   summary: Check availability of user in database.
 *   description: Check availability of user in database.
 */

// ******************************************* Quiz endpoints **************************************************

app.get("/auth/quiz");
/**
 * @swagger
 * /auth/quiz:
 *  get:
 *   summary: Get quiz.
 *   description: get all quiz from database.
 */

app.get("/auth/quiz/:id");
/**
 * @swagger
 * /auth/quiz/:id:
 *  get:
 *   summary: Get one quiz.
 *   description: get one quiz from database.
 */

// ******************************************* Quiz_easy endpoints **************************************************


app.get("/results_easy/:id")
/**
 * @swagger
 * /auth/results_easy/:id:
 *  get:
 *   summary: Get results from table results_easy.
 *   description:  Get results from table results_easy.
 */

app.get("/auth/results_easy")
/**
 * @swagger
 * /auth/results_easy:
 *  get:
 *   summary: Get all records from results_easy.
 *   description: Get all records from results_easy.
 */

app.get("/results_easy_token/{accessToken}");
/**
 * @swagger
 * /auth/results_easy_token/:accessToken:
 *  get:
 *   summary: Get all records from results_easy.
 *   description: Get all records from results_easy.
 */

app.post("/auth/results_easy");
/**
 * @swagger
 * /auth/results_easy:
 *  post:
 *   summary: Create/Update the results of a user logged in.
 *   description: Create/Update the results of a user logged in.
 */


// ******************************************* Quiz_hard endpoints **************************************************


app.get("/results_hard/:id")
/**
 * @swagger
 * /auth/results_hard/:id:
 *  get:
 *   summary: Get results from table results_hard.
 *   description:  Get results from table results_hard.
 */

app.get("/auth/results_hard")
/**
 * @swagger
 * /auth/results_hard:
 *  get:
 *   summary: Get all records from results_hard.
 *   description: Get all records from results_hard.
 */

app.get("/results_hard_token/{accessToken}");
/**
 * @swagger
 * /auth/results_hard_token/:accessToken:
 *  get:
 *   summary: Get all records from results_hard.
 *   description: Get all records from results_hard.
 */

app.post("/auth/results_hard");
/**
 * @swagger
 * /auth/results_hard:
 *  post:
 *   summary: Create/Update the results of a user logged in.
 *   description: Create/Update the results of a user logged in.
 */


// ******************************************* Quiz_final endpoints **************************************************


app.get("/results_final/:id")
/**
 * @swagger
 * /auth/results_final/:id:
 *  get:
 *   summary: Get results from table results_final.
 *   description:  Get results from table results_final.
 */

app.get("/auth/results_final")
/**
 * @swagger
 * /auth/results_final:
 *  get:
 *   summary: Get all records from results_final.
 *   description: Get all records from results_final.
 */

app.get("/results_final_token/{accessToken}");
/**
 * @swagger
 * /auth/results_final_token/:accessToken:
 *  get:
 *   summary: Get all records from results_final.
 *   description: Get all records from results_final.
 */

app.post("/auth/results_final");
/**
 * @swagger
 * /auth/results_final:
 *  post:
 *   summary: Create/Update the results of a user logged in.
 *   description: Create/Update the results of a user logged in.
 */

//*******************************************************************************************************************
app.listen(port, () => console.log(`Server started on port ${port}`));