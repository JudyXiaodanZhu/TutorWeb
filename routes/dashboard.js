'use strict';

var User = require("../models/user");
var Course = require("../models/course");
var Post = require("../models/post");

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

exports.postStudentRequest = function(req, res) {
    if (req.session.user === undefined) return res.redirect("/login");

    if(!req.body.subject || !req.body.title || !req.body.detail || !req.body.when)
        return res.send({status: 1});

    let new_post_json = JSON.parse(JSON.stringify(req.body));
    new_post_json["is_student"] = true;
    new_post_json["username"] = req.session.user.username;
    new_post_json["date"] = new Date();
    let new_post = new Post(new_post_json);
    new_post.save(function(err, result) {
        if (err) throw err;
        res.send({status: 0});
    });
};

exports.postTutorRequest = function(req, res) {
    // TODO Judy
}
