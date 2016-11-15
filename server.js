var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");

var app = express();

app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendfile("index.html");
});

app.post("/signup", routes.postNewUser);

app.post("/login", routes.postLogin);

app.get("/dashboard", routes.getDashboard);

app.get("/search", routes.getSearch);

app.get("/profile", routes.getProfile);

app.post("/profile", routes.postProfile);

app.get("/course", routes.getCourse);

app.get("/chat", routes.getChat);

app.post("/chat", routes.postChat);

var server = app.listen(3000, function(request, response) {
    console.log("Running on 127.0.0.1:%s", server.address().port);
});
