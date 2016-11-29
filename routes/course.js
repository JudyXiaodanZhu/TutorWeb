'use strict';

var User = require("../models/user"); // Can be removed if not used
var Course = require("../models/course");

// TODO Jack: add any functions they you need.
exports.getCourse = function(req, res)
{

    //Gets the course id, for the course page the user wants to visit.
    let userType = req.session.user.type;
    let course = req.url.substring(req.url.indexOf("id=") + "id=".length).trim();
    let username = req.session.user.username;
    let friends = [];

    //If admin, get all users as friends.
    if(userType.toLowerCase() == "admin")
    {
        User.find(userType, function(err, users) {
            for (let i = 0; i < users.length; i++)
            {
                if(users[i].type.toLowerCase() == "admin" ||
                   users[i].courses.indexOf(course) != -1)
                friends.push({username : users[i].username,
                              online : users[i].online});
            }

    let whatToFind = req.session.user.type === "admin" ? {} : { code : { $in: req.session.user.courses }};
    Course.find(whatToFind, function(err, courses) {
        let enrolled = [];
        for (let i = 0; i < courses.length; i++)
            enrolled.push({ code : courses[i].code,
                          num_posts : courses[i].posts.length,
                          num_tutors : courses[i].tutors.length,
                          num_students : courses[i].students.length});

            let settings = {friends: friends, userType: userType, courses: enrolled, currCourse: course};
            res.render("course.html", settings);

        });
      });
    }
    //console.log(friends);
    //If not admin get all friends.
    else
    {
        User.find(userType, function(err, users) {
            for (let i = 0; i < users.length; i++)
            {
                if(users[i].username == username)
                {

                    //If user has no friends it will add the text below.
                    if(users[i].friends.length == 0)
                    {
                        friends.push("None of your friends are enrolled in " +
                                     "this course.");
                    }
                    else
                    {
                        let fTemp = users[i].friends;
                        for(let x = 0; x < users.length; x++)
                        {
                          //Finds users friends who are enrolled in the course
                          //or they're admins, therefore, they would automatically
                          //be enrolled in the course.
                            if(fTemp.indexOf(users[x].username) != -1 &&
                               (users[x].courses.indexOf(course) != -1 ||
                               users[x].type.toLowerCase() == "admin"))
                            {
                                friends.push({username : users[x].username,
                                              online : users[x].online});
                            }
                        }
                    }
                }
            }

            let whatToFind = req.session.user.type === "admin" ? {} : { code : { $in: req.session.user.courses }};
            Course.find(whatToFind, function(err, courses) {
                let enrolled = [];
                for (let i = 0; i < courses.length; i++)
                    enrolled.push({ code : courses[i].code,
                                  num_posts : courses[i].posts.length,
                                  num_tutors : courses[i].tutors.length,
                                  num_students : courses[i].students.length});

                let settings = {friends: friends, userType: userType, courses: enrolled};
                res.render("course.html", settings);

            });
        });
    }



};
