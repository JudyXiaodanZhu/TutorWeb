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
    } else if (content.match(/\d{3}/g)) {
        Course.find({code: {$regex:content}},function(err,courses){
            if(err) throw err;
            res.render("search.html", {type: "course", data: courses, scripts: ["search"]});
        });
    } else if (content.match(/[A-Za-z]{3}\d{3}/g)) {
        Course.findOne({code:content.toUpperCase()},function(err,course){
            if(err) throw err;
            res.render("search.html", {type: "course", data: [course], scripts: ["search"]});
        });
    } else {
        User.find({type:'tutor',username:{$regex:content}},function(err,users){
            if(err) throw err;
            res.render("search.html", {type: "user", users: users, scripts: ["search"]});
        });
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
              console.log(user);
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
              console.log(user);
              res.send(f1 + ' and ' + f2 + ' make friends success');
          })
      }
    })
}

//NOTE: doesn't work here.. it works until calling .save method.. it it generates validator error
//NOTE: make friends works through Mongo DB but add course does note
//NOTE: once add course failed by updating mongo db, need to re-start the server to get add course work
//NOTE: schema problem probably
exports.addCourse = function(req,res){
    if (req.session.user === undefined) return res.redirect("/login");

    let courseCode = req.body.code;console.log(courseCode)
    //add the student to the students field of the course, based on the schema..
    //Note: use .findOne here instead of .find
    Course.findOne({code:courseCode},function(err,course){
        console.log(course);//works..
        if (err) throw err;
        if (req.session.user.type === "student") {
            if(course.students.indexOf(req.session.user.username) === -1){
                course.students.push(req.session.user.username);
            }
        } else if (req.session.user.type === "tutor") {
            if(course.tutors.indexOf(req.session.user.username) === -1){
                course.tutors.push(namreq.session.user.usernamee);
            }
        }
        course.save(function(err){
            //NOTE: Course validation error
            if(err) throw err;
            res.send('Student ' + name +' has successfully add the coures '+ course.code);
        });

    });
}
//note: need to clean and re-make the mongo database to make it 100% correct..
//Raymond Ends......
