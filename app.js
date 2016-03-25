'use strict';

// simple express server
var express = require('express');
var app = express();

app.use(express.static('app'));
app.get('/', function (req) {
    req.sendFile('app/index.html', {'root': '.'});
});

app.listen(3030);