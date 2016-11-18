var User = require("./models/user");

exports.postNewUser = function(req, res) {
    // TODO Add into database, then render to dashboard
    console.log("New User");
    console.log(req.body);
    res.send("not implemented");
};

exports.postLogin = function(req, res) {
    // TODO Check database, then render to dashboard
    console.log("Log in");
    console.log(req.body);
    User.findOne({ username : req.body.username }, function(err, user) {
        if (err) throw err;

        // TODO a better way to do this?
        if (!user) res.json({status: 1});
        else if (user.password != req.body.password) res.json({status: 2});
        else res.json({status: 0});
    });
};

exports.getDashboard = function(req, res) {
    res.sendFile(__dirname + "/public/dashboard.html");
};

exports.getSearch = function(req, res) {};

exports.getProfile = function(req, res) {};

exports.postProfile = function(req, res) {};

exports.getCourse = function(req, res) {};

exports.getChat = function(req, res) {};

exports.postChat = function(req, res) {};
