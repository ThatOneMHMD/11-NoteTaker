
const express = require('express');
const app = express();
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

// to deploy in Heroku:
const PORT = process.env.PORT || 3001;

// 3 middlewares: access JSON paring, allows server to accept express JSON, and our own file (PRESENT IN ALL EXPRESS SERVERS)
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
})


// npm run watch
// !!