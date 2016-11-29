'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var nunjucks = require('nunjucks');
var session = require('express-session');

var course = require("./routes/course");
var dashboard = require("./routes/dashboard");
var profile = require("./routes/profile");
var signin = require("./routes/signin");
var search = require("./routes/search");
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

app.get("/", function(req, res) { // Done
    res.render("index.html", { navbarFixedTop : true});
});

app.get("/signup", function(req, res) { // Done
    res.render("signup.html", { scripts: ["signin"], styles: ["signin"] });
});

app.get("/login", function(req, res) { // TODO Remember me function (unclaimed)
    res.render("login.html", { scripts: ["login"], styles: ["signin"] });
});

app.get('/logout', signin.getLogout);// Done
app.post("/signup", signin.postNewUser);// Done
app.post("/login", signin.postLogin); // Done

app.get("/dashboard", dashboard.getDashboard);// TODO implement public/dashboard.html (Tutor part) (Judy)
app.post("/postStudentRequest", dashboard.postStudentRequest);// Done
app.post("/postTutorRequest", dashboard.postTutorRequest);// Done


//Raymond Begins
app.get('/search', search.getSearch);// TODO Can do improvement
app.post('/makeFriends', search.makeFriends); //TODO Add feedback
app.post('/addCourse', search.addCourse);// TODO Add feedback, BUG!
// Other functions needed in search.js
//Raymond Ends..

app.get("/course", course.getCourse);// TODO Not implemented (Jack)
// Other functions needed in course.js

app.get("/profile", profile.getProfile);// Done
app.get("/profile", profile.postProfile);// TODO update profile (unclaimed)
app.post("/removeCourse", profile.removeCourse);// Done
app.post("/removeFriend", profile.removeFriend);// Done
app.post("/removeTutorPost", profile.removeTutorPost);// Done


var server = app.listen(3000, function(request, response) {
    console.log("Running on 127.0.0.1:%s", server.address().port);
});
