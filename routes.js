'use strict';

var User = require("./models/user");
var Course = require("./models/course")

exports.postNewUser = function(req, res) {
    // TODO Add into database, then render to dashboard
    console.log("New User");
    console.log(req.body);
    res.send("not implemented");
};

exports.postLogin = function(req, res) {
    console.log("Log in");
    console.log(req.body);
    User.findOne({ username : req.body.username }, function(err, user) {
        if (err) throw err;

        // TODO a better way to do this?
        if (!user) res.json({status: 1});
        else if (user.password != req.body.password) res.json({status: 2});
        else {
            user.online = true;
            user.save(function(err, data) {
                if (err) throw err;
            });
            let userdata = JSON.parse(JSON.stringify(user));
            delete userdata._id;
            delete userdata.password;
            res.json({status: 0, userdata: userdata});
        }
    });
};

exports.getDashboard = function(req, res) {
    res.sendFile(__dirname + "/public/dashboard.html");
};

exports.getStatus = function(req, res) {
    User.find({ username : { $in: req.query.friends}}, function(err, users) {
        let status = [];
        for (let i = 0; i < users.length; i++)
            status.push({ username : users[i].username,
                          online : users[i].online});
        res.send(status);
    });

}

exports.getSearch = function(req, res) {};

exports.getProfile = function(req, res) {
    res.send("Not implemented");
};

exports.postProfile = function(req, res) {};

exports.getCourse = function(req, res) {
    res.send("Not implemented");
};

exports.getChat = function(req, res) {};

exports.postChat = function(req, res) {};
