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
                name:'Farrukh Mahmood',
                url:'',
                email:'farrukhb30@gmail.com'
            },
            servers:["http://localhost:4000"]
        }
    },
    apis:["authServer.js"]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

// Middleware
app.use(bodyParser.json());
app.use(cors());
const auth = require('./routes/api/auth');
app.use('/auth', auth)

const port = process.env.PORT || 4000;

app.post("/auth/signup");
/**
 * @swagger
 * /auth/signup:
 *  post:
 *   summary: SignUp user
 *   description: SignUp user
 */

app.post("/auth/login");
/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: Login user
 *   description: Login user
 */

app.post("/auth/logout");
/**
 * @swagger
 * /auth/logout:
 *  post:
 *   summary: Logout user
 *   description: Logout user
 */

app.delete("/auth/removeAccount");
/**
 * @swagger
 * /auth/removeAccount:
 *  delete:
 *   summary: Delete user
 *   description: Delete user
 */

app.get("/auth/quiz");
/**
 * @swagger
 * /auth/quiz:
 *  get:
 *   summary: Get quiz
 *   description: get all quiz from database.
 */

app.get("/auth/quiz/:id");
/**
 * @swagger
 * /auth/quiz/:id:
 *  get:
 *   summary: Get one quiz
 *   description: get one quiz from database.
 */

app.listen(port, () => console.log(`Server started on port ${port}`));