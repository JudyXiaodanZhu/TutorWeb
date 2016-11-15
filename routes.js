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
    res.send("not implemented");
};

exports.getDashboard = function(req, res) {};

exports.getSearch = function(req, res) {};

exports.getProfile = function(req, res) {};

exports.postProfile = function(req, res) {};

exports.getCourse = function(req, res) {};

exports.getChat = function(req, res) {};

exports.postChat = function(req, res) {};
