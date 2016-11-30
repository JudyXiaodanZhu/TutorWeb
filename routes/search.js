'use strict';
//Raymond Begins......
var User = require("../models/user");
var Course = require("../models/course");
//data from courses_seed.json and from users_seed.json have been
//loaded to the corresponding mongo database via command in terminal..

//build the response here..
//handle HTTP request sent via dashboard.js(the assets' one)
exports.getSearch = function(req, res) {
    if (req.session.user === undefined) return res.redirect("/login");

    let content = req.query.content;
    //the below if statement has covered all the possibilities
    if (content.length === 0) {
        res.render("search.html");
    } else if (content.match(/\d{3}/g)) { //search course
        Course.find({code: {$regex:content}},function(err,courses){
            if(err) throw err;
            res.render("search.html", {status:req.session.user.type,type: "course", data: courses, scripts: ["search"]});
        });
    } else if (content.match(/[A-Za-z]{3}\d{3}/g)) { //search course
        Course.findOne({code:content.toUpperCase()},function(err,course){
            if(err) throw err;
            res.render("search.html", {status:req.session.user.type,type: "course", data: [course], scripts: ["search"]});
        });
    } else {
         //search tutors, while logged in as a student
        if(req.session.user.type == 'student'){
            console.log(req.session.user.type + ' should be student');
            User.find({type:'tutor',username:{$regex:content}},function(err,users){
                if(err) throw err;
                res.render("search.html", {type: "tutors", users: users, scripts: ["search"]});
            });
        }else if(req.session.user.type == 'tutor'){//search students, while logged in as a tutor
            console.log(req.session.user.type + ' should be tutor' );
            User.find({type:'student',username:{$regex:content}},function(err,users){
                if(err) throw err;
                res.render("search.html", {type: "students", users: users, scripts: ["search"]});
            });
        }
        //search students,  logged in as a tutor
    }
};

//works and done
exports.makeFriends = function(req, res){
    if (req.session.user === undefined) return res.redirect("/login");

    let f1 = req.body.username;
    let f2 = req.session.user.username;
    //mutually add friends here

    User.findOne({username:f1},function(err,user){
      //console.log(user);
      //console.log(user.friends);
      if(err) throw err;
      if(user.friends.indexOf(f2) == -1){ //prevent duplicate
          user.friends.push(f2);
          user.save(function(err){
              if(err) throw err;
              //console.log(user);
          })
      }
    })
    User.findOne({username:f2},function(err,user){
      //console.log(user);
      //console.log(user.friends);
      if(err) throw err;
      if(user.friends.indexOf(f1) == -1){ //prevent duplicate
          user.friends.push(f1);
          user.save(function(err){
              if(err) throw err;
              //console.log(user);
          })
          return res.send('Success');
      }else{
          return res.send('You are already friends.');
      }
    })
}

exports.addCourse = function(req,res){
    if (req.session.user === undefined) return res.redirect("/login");

    let courseCode = req.body.code;console.log(courseCode)
    //add the student to the students field of the course, based on the schema..
    //Note: use .findOne here instead of .find
    Course.findOne({code:courseCode},function(err,course){
        if (err) throw err;
        if (req.session.user.type === "student") {
            if(course.students.indexOf(req.session.user.username) === -1){
                course.students.push(req.session.user.username);
            }
        } else if (req.session.user.type === "tutor") {
            if(course.tutors.indexOf(req.session.user.username) === -1){
                course.tutors.push(req.session.user.username);
            }
        }
        course.save(function(err, result) {
            if(err) throw err;
        });
    });

    User.findOne({ username: req.session.user.username }, function(err, user){
        if (err) throw err;
        if(user.courses.indexOf(courseCode )== -1){
            user.courses.push(courseCode);
            user.save(function(err, result) {
                if(err) throw err;
            });
            return res.send('Success');
        }else{
            return res.send('Course previously added.');
        }
    })
}
//note: need to clean and re-make the mongo database to make it 100% correct..
//Raymond Ends......
