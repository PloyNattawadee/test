const express = require('express');
const mysql = require('mysql');
const Register = require('./api/model/db')
const route = require('./api/controller/register')
var bodyParser = require('body-parser');
var cors = require('cors');
const http = require('http');
var url = require('url');
var path = require('path')
const morgan = require('morgan');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

const app = express();

http.createServer(function (req, res ,next) {
    console.log(method.req)
   // var cookies = parserCookies(req);
    const { headers, method, url } = req;
    let body = [];

    res.setHeader('Content-Type', 'application/json');

    req.on('error', (err) => {
        console.log(err);
    }).on('data', (user) => {
        body += user
    }).on('end', () => {
        var post = querystring.parse(body);
        const responseBody = { headers, method, url, body };
        res.write("Successfull");
        console.log("ploy" + body);
        console.log('SDSAADS2 ' + JSON.stringify(post));

        res.setHeader('Set-Cookie', 'mycookies = cookies')
        res.end();

    });
    next();
})
app.listen('3000', () => {
    console.log('Server started on port 3000');
});

app.use(cookieParser());

route.use(cors())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/account', route)


