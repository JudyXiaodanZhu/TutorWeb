'use strict';

var User = require("./models/user");
var Course = require("./models/course");

exports.postNewUser = function(req, res) {
    // TODO Add into database, then render to dashboard
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

exports.getDashboard = function(req, res) {
    if (req.session.user === undefined) return res.redirect("/login");

    let whatToFind = req.session.user.type === "admin" ? {} : { code : { $in: req.session.user.courses }};
    Course.find(whatToFind, function(err, courses) {
        let enrolled = [];
        for (let i = 0; i < courses.length; i++)
            enrolled.push({ code : courses[i].code,
                          num_posts : courses[i].posts.length,
                          num_tutors : courses[i].tutors.length,
                          num_students : courses[i].students.length});

        let whatToFind = req.session.user.type === "admin" ? {} : { username: { $in: req.session.user.friends}};
        User.find(whatToFind, function(err, users) {
            let friends = [];
            for (let i = 0; i < users.length; i++)
                friends.push({ username : users[i].username,
                              online : users[i].online});

            let settings = {friends: friends, courses, enrolled, scripts: ["dashboard"]};
            res.render("dashboard.html", settings);
        });
    });
}

exports.getSearch = function(req, res) {};

exports.getProfile = function(req, res) {
    User.findOne({ username : req.query.id }, function(err, user) {
        res.render("profile.html", {user: user, scripts: ["profile"]});
    });
};

exports.postProfile = function(req, res) {};

exports.getCourse = function(req, res) {
    res.send("Not implemented");
};

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

exports.removePostRequest = function(req, res) {
    if (req.session.user === undefined) return res.redirect("/login");

    User.update({ username : req.session.user.username },
                { $pull : { posts : {_id:req.body.id} } }, function(err, result) {
        if (err) throw err;
        if (result.ok === 1) res.send({status: 0});
        else res.send({status: 2});
    });
};

exports.postRequest = function(req, res) {
    if (req.session.user === undefined) return res.redirect("/login");

    if(!req.body.subject || !req.body.title || !req.body.detail || !req.body.when)
        return res.send({status: 1});

    let new_post = JSON.parse(JSON.stringify(req.body));
    new_post["date"] = new Date();
    User.update({ username : req.session.user.username },
                { $push : { posts : new_post } }, function(err, result) {
        if (err) throw err;
        if (result.ok === 1) res.send({status: 0});
        else res.send({status: 2});
    });
};
