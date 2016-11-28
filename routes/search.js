'use strict';
//Raymond Begins......
var User = require("../models/user");
var Course = require("../models/course");
//data from courses_seed.json and from users_seed.json have been
//loaded to the corresponding mongo database via command in terminal..

// TODO Raymond: add any functions they you need.
//build the response here..
//handle HTTP request sent via dashboard.js(the assets' one)
exports.getSearch = function(req, res) {
    //console.log(username);
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
          if(err) throw err;
          res.render("search.html", {type: "course", data: courses, scripts: ["search"]});
        })
    }else if(completeCourseCode !== undefined){
        //res.send('completeCourseCode Success to backend'); //front -> back -> front test
        var temp = completeCourseCode.toUpperCase();
        Course.findOne({code:temp},function(err,course){
          if(err) throw err;
          res.render("search.html", {type: "course", data: [course], scripts: ["search"]});
        })
    }
};


//handle HTTP requests sent via search.js(the assets' one)
exports.getCurrentUserName = function(req,res){
    res.send(req.session.user.username);
}

exports.getCurrentUserStatues = function(req,res){
    res.send(req.session.user.type);
}

//works and done
exports.makeFriends = function(req,res){
    console.log(req.query.f1); //works
    console.log(req.query.f2); //works
    var f1 = req.query.f1;
    var f2 = req.query.f2;
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
    var courseCode = req.query.course;
    var name = req.query.myName;
    var status = req.query.myStatus;
    console.log('3 queries work? ' + courseCode +' ' + name +'  ' + status); //works here..
    //add the student to the students field of the course, based on the schema..
    //Note: use .findOne here instead of .find
    if(status == 'student'){
        console.log('if statement student add course'); //works
        Course.findOne({code:courseCode},function(err,course){
            console.log(course);//works..
            if(err) throw err;
            if(course.students.indexOf(name) == -1){ //prevent duplicate
                course.students.push(name);
                course.save(function(err){
                    //NOTE: Course validation error
                    if(err) throw err;
                    res.send('Student ' + name +' has successfully add the coures '+ course.code);
                });
            };

        })
    }else if(status == 'tutor'){
        console.log('if statement tutor add course'); //works..
        Course.findOne({code:courseCode},function(err,course){
            console.log(course);
            if(err) throw err;
            if(course.tutors.indexOf(name) == -1){
                course.tutors.push(name);
                course.save(function(err){
                    //NOTE: Course validation error
                    if(err) throw err;
                    res.send('Tutor ' + name + ' has successfully add the course '+ course.code);
                })
            }
        })
    }

}
//note: need to clean and re-make the mongo database to make it 100% correct..
//Raymond Ends......
