const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');



const swaggerOptions={
    definition:{
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

app.post("/signup");
/**
 * @swagger
 * /auth/signup:
 *  post:
 *   summary: SignUp user
 *   description: SignUp user
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the team
 *      schema:
 *       $ref: '#/definitions/Team'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Team'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */



app.listen(port, () => console.log(`Server started on port ${port}`));