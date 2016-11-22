var express = require('express');
var ParseDashboard = require('parse-dashboard');
var http = require('http');

var dashboard = new ParseDashboard({
    apps: [
        {
            appId: process.env.APP_ID || 'myAppId',
            masterKey: process.env.MASTER_KEY,
            serverURL: process.env.SERVER_URL,
            appName: process.env.APP_NAME,
        },
    ],
    users: [
        {
            user: process.env.USER_NAME,
            pass: process.env.PASSWORD
        }
    ]
}, true /* note: you have to set allowInsecureHTTP=true, HyperDev is still using HTTPS externally, but proxy to app container comms inside our network happen over http */);

var app = express();

// make the Parse Dashboard available at root /
app.use('/', dashboard);

var port = process.env.PORT || 3000;
var httpServer = http.createServer(app);
httpServer.listen(port, function () {
    console.log('parse-dashboard running on port ' + port);
});
