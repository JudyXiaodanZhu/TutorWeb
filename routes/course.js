'use strict';

var User = require("../models/user"); // Can be removed if not used
var Course = require("../models/course");

exports.getCourse = function(req, res)
{

    //Gets the course id, for the course page the user wants to visit.
    let userType = req.session.user.type;
    let course = req.url.substring(req.url.indexOf("id=") + "id=".length).trim();
    let username = req.session.user.username;
    let friends = [];
    let previousPosts = [];

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
        {
            enrolled.push({code : courses[i].code,
                          num_posts : courses[i].posts.length,
                          num_tutors : courses[i].tutors.length,
                          num_students : courses[i].students.length});

            if(courses[i].code == course)
            {
                for(let x = 0; x < courses[i].posts.length; x++)
                {
                    let v = [courses[i].posts[x].author, courses[i].posts[x].text, courses[i].posts[x].responses];
                    previousPosts.push(v);
                }
            }
        }

            let settings = {friends: friends, userType: userType, courses: enrolled, currCourse: course, username: username, prevPosts: previousPosts};
            res.render("course.html", settings);

        });
      });
    }

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

                let settings = {friends: friends, userType: userType, courses: enrolled, currCourse: course, username: username};
                res.render("course.html", settings);

            });
        });
    }
};

exports.addPost = function(req, res)
{
    let question = req.body.textQuestion;
    let username = req.session.user.username;
    let userType = req.session.user.type;
    let currDate = getDate();
    let currTime = getTime();
    let groupCode = req.url.substring(req.url.indexOf("id=") + "id=".length).trim();
    let newPost = [{"text": question, "author": username, "date": currDate + currTime,
                   "responses": []}];
    let currID;
    let currPosts;

    getRows(groupCode, newPost, function(err, val)
    {
          if(err)
          {
              console.log("Error with retreiving posts for courses.");
          }
          else
          {
              Course.update({_id:val[0]}, {$set:{posts:val[1]}}, function(err, result)
              {
                    if(err)
                    {
                        console.log("Error: Updating Course Table, at row with _id: " + val[0] + "\n with new posts: " + val[1] + "\n");
                    }
                    else
                    {
                        console.log("Success: Updating Course Table, at row with _id: " + val[0] + "\n");
                        let v = __dirname;
                        v = v.substring(0, v.indexOf('/routes')).trim();

                    }
              });
            }
      });
}

function getRows(groupCode, newPost, callback)
{
  Course.find(function(error, cursor)
  {
    if(error)
    {
        callback("error", null, []);
    }
    else
    {
        let currID;
        let currPosts;
        for(let i = 0; i < cursor.length; i++)
        {
            if(cursor[i].code.toLowerCase() == groupCode.toLowerCase())
            {
                currID = cursor[i]._id;
                currPosts = cursor[i].posts;
                break;
            }
        }
        let p = [];
        for(let i = 0; i < currPosts.length; i++)
        {
            p.push(currPosts[i]);
        }
        p.push(newPost[0]);
        callback(null, [currID, p]);
    }
  });
}

function getDate()
{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd < 10)
    {
        dd = '0' + dd
    }

    if(mm < 10)
    {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd + "T";
    return today;
}

function getTime()
{
    let d = new Date();
    let hh = d.getHours();
    let mm = d.getMinutes();
    let ss = d.getSeconds();

    if(hh < 10)
    {
        hh = '0' + hh;
    }

    if(mm < 10)
    {
        mm = '0' + mm;
    }

    if(ss < 10)
    {
        ss = '0' + ss;
    }
    return(hh + ":" + mm + ":" + ss + "Z");
}
