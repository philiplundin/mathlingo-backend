This project is Node.js part of the main project Mathlingo and includes all the necessary backend operations required for the Mathlingo.

https://www.npmjs.com/package/sqlite3

https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

Installera först med npm, öppna terminlafönstret i samma katalog som du ska köra filerna.

    Skapa package.json fil npm init

    Installera Express (lokalt i den katalog du har filerna) npm install express

    Installera body-parser (https://expressjs.com/en/resources/middleware/body-parser.html) npm install body-parser

    Installera sqlite npm install sqlite3

    Installera cors (man startar upp en lokal webbserver på ett annat port-nummer behöver man lösa att cors) (https://expressjs.com/en/resources/middleware/cors.html) npm install cors

Kör koden i ett terminalfönster i samma katalog node server.js

Port nummer: 3000

use cases:

    registrera ett user med Json object som body. (POST) http://127.0.0.1:3000/api/user

    hämta all users (GET) http://127.0.0.1:3000/api/user

    hämta ett user (GET) http://127.0.0.1:3000/api/user/:id

    radera ett konto/user(DELETE) http://127.0.0.1:3000/api/user/:id

    uppdatera ett konto/user(PUT) http://127.0.0.1:3000/api/user/:id
