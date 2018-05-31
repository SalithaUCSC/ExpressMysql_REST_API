const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); 
// default route
app.get('/', function (req, res) {
    return res.send("Welcome to API")
});
// make router
const posts = require('./routes/posts');
app.use('/', posts);
// start server
app.listen(8080, function () {
    console.log('Server started on port 8080');
});