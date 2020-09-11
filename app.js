const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

///Routes
const Example = require('./routes/example');

///Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, responseType'
    );
    next();
});

///Routing Handler
app.use(Example);

///Error Handler
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(`${process.env.mongodbURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Databse Connection Established");
    app.listen(process.env.PORT, () => {
        console.log(`The server is running on port ${process.env.PORT}`);
    });
})
mongoose.Promise = global.Promise;