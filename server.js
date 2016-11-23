'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var nunjucks = require('nunjucks');
var session = require('express-session');

var routes = require("./routes");
var User = require("./models/user");
var Course = require("./models/course")

var app = express();
nunjucks.configure('public', { autoescape: true, express: app });

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'What is this', resave: false, saveUninitialized: false }));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.get("/", function(req, res) { // TODO Main page design
    res.render("index.html");
});

app.get("/signup", function(req, res) { // TODO Not implemented
    res.render("signup.html", { scripts: ["signup"], styles: ["signin"] });
});

app.get("/login", function(req, res) { // Done
    res.render("login.html", { scripts: ["login"], styles: ["signin"] });
});

app.get('/logout', routes.getLogout);// Done

app.post("/signup", routes.postNewUser);// TODO Not implemented
app.post("/login", routes.postLogin); // Done

app.get("/dashboard", routes.getDashboard);// TODO Mostly Done (page for tutor)
app.get("/search", routes.getSearch);// TODO Not implemented
app.get("/profile", routes.getProfile);// Done
app.get("/course", routes.getCourse);// TODO Not implemented

app.post("/removeCourse", routes.removeCourse);// Done
app.post("/removeFriend", routes.removeFriend);// Done
app.post("/removePostRequest", routes.removePostRequest);// Done
app.post("/postRequest", routes.postRequest);// Done

var server = app.listen(3000, function(request, response) {
    console.log("Running on 127.0.0.1:%s", server.address().port);
});
