// imported and required data:
const express = require('express');
const app = express();
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

// to deploy in Heroku, we use an alternative port in case 3001 is busy etc.:
const PORT = process.env.PORT || 3001;

// middlewares: the first allows access to JSON parsing, and the second allows server to accept express JSON:
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// middlewares to allow server to use the routes with the corresponding change to the url! Note that htmlroutes is the default url path, and the apiroutes is the /api url path!
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// listening to port action! Displayes the default link to localhost for ease of use!
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
})

// run "npm run watch" in console to substitue "npx nodemon server.js"! 