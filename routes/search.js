'use strict';

var User = require("../models/user");
var Course = require("../models/course");
//data from courses_seed.json and from users_seed.json have been
//loaded to the corresponding mongo database via command in terminal..

// TODO Raymond: add any functions they you need.
//build the response here..
exports.getSearch = function(req, res) {
    var tutorName = req.query.tutorName;
    var shortCourseCode = req.query.shortCourseCode;
    var completeCourseCode = req.query.completeCourseCode;
    //the below if statement has covered all the possibilities
    if(tutorName !== undefined){
        //res.send('tutorName success to backend'); //front -> back -> front test
        User.findOne({type:'tutor',username:tutorName},function(err,user){
          if(err) throw err;
          res.render("search.html", {type: "user", data: user, scripts: ["search"]});
        })
    }else if(shortCourseCode !== undefined){
        Course.find({code: {$regex:shortCourseCode}},function(err,courses){
          if(err) throw err;console.log(courses)
          res.render("search.html", {type: "course", data: courses, scripts: ["search"]});
        })
    }else if(completeCourseCode !== undefined){
        //res.send('completeCourseCode Success to backend'); //front -> back -> front test
        Course.findOne({code:completeCourseCode},function(err,course){
          if(err) throw err;
          res.render("search.html", {type: "course", data: [course], scripts: ["search"]});
        })
    }
};
