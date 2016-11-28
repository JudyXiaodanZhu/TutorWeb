'use strict';

var User = require("../models/user");
var Post = require("../models/post");

exports.getProfile = function(req, res) {
    User.findOne({ username : req.query.id }, function(err, user) {
        if (err) throw err;
        Post.find({ username : req.query.id }, function(err, posts) {
            if (err) throw err;
            res.render("profile.html", {user: user, posts: posts, scripts: ["profile"]});
        });
    });
};

exports.postProfile = function(req, res) {};

exports.removeCourse = function(req, res) {
    if (req.session.user === undefined) return res.redirect("/login");

    User.update({ username : req.session.user.username },
                { $pull : { courses : req.body.course } }, function(err, result) {
        if (err) throw err;
        if (result.ok === 1) res.send({status: 0});
        else res.send({status: 2});
    });
};

exports.removeFriend = function(req, res) {
    if (req.session.user === undefined) return res.redirect("/login");

    User.update({ username : req.session.user.username },
                { $pull : { friends : req.body.friend } }, function(err, result) {
        if (err) throw err;
        if (result.ok === 1) res.send({status: 0});
        else res.send({status: 2});
    });
};

exports.removeTutorPost = function(req, res) {
    if (req.session.user === undefined) return res.redirect("/login");

    Post.remove({ _id : req.body.id }, function(err, result) {
        if (err) throw err;
        if (result.nRemoved === 1) res.send({status: 0});
        else res.send({status: 2});
    });
};
