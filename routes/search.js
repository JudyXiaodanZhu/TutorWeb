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
      if(user.friends.indexOf(f2) == -1){
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
      if(user.friends.indexOf(f1) == -1){
          user.friends.push(f1);
          user.save(function(err){
              if(err) throw err;
              console.log(user);
              res.send(f1 + ' and ' + f2 + ' make friends success');
          })
      }
    })
}

//TODO
exports.addCourse = function(req,res){
    console.log(req.query.course); //works
    console.log(req.query.myName);//works
}
//NOTE: need to clean and re-make the mongo database to make it 100% correct..
//Raymond Ends......
