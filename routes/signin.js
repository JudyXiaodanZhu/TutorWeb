'use strict';

var User = require("../models/user");
var Course = require("../models/course");

exports.postNewUser = function(req, res) {
    // TODO Judy
    console.log("New User");
    console.log(req.body);
    res.send("not implemented");
};

exports.postLogin = function(req, res) {
    User.findOne({ username : req.body.username }, function(err, user) {
        if (err) throw err;

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
            req.session.user = userdata;
            res.json({status: 0, userdata: userdata});
        }
    });
};

exports.getLogout = function(req, res) {
    User.findOne({ username : req.session.user.username }, function(err, user) {
        if (err) throw err;

        user.online = false;
        user.save(function(err, data) {
            if (err) throw err;
        });
    });
    req.session.destroy();
    res.redirect('/');
}
