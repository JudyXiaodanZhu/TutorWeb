'use strict';

var dashboard = {};

dashboard.init = function() {
    let user = getCookie("user");
    if (!user) window.location = "/login";
    user = JSON.parse(user);
    let courses = user.courses, friends = user.friends;

    // Fill in course list
    // TODO Need to change to AJAX style like friend list later
    for (let i = 0; i < courses.length; i++)
        $("#courses-div").append($("<a />").prop("href", "/course?id=" + courses[i])
                                           .prop("class", "list-group-item")
                                           .text(courses[i]));

    // Fill in friend list
    $.get("/status", {friends : friends}, function(result) {
        for (let i = 0; i < result.length; i++) {
            let a = $("<a />").prop("href", "/profile?id=" + result[i].username)
                              .prop("class", "list-group-item")
                              .text(result[i].username)
                              .append($("<span />").css("float", "right")
                                                   .css("color", result[i].online ? "green" : "red")
                                                   .text("● " + (result[i].online ? "online" : "offline")));
            $("#friends-div").append(a);
        }
        if (!result.length) {
            let span = $("<span />").prop("class", "list-group-item")
                                    .text("Find a friend or tutor now!");
            $("#friends-div").append(span);
        }
    });

    // Main part
    if (user.type === "admin") {
        let div = $("<div />").prop("class", "list-group-item")
                              .append($("<p />").text("Hi " + user.username + ", what would you like to do today?"))
                              .append($("<p />").text("Click a course on the left to manage posts in forum."))
                              .append($("<p />").text("Click a user on the right to edit this person's profile."));
        $("#main-div").append(div);
    } else if (user.type === "student") {
        let form = `
            <form class="list-group-item">
                <p>Post a question and connect with tutors.</p>
                <p>Subject<br>
                    <input type="text" style="width: 100%">
                </p>
                <p>What are you working on?<br>
                    <input type="text" style="width: 100%"
                    placeholder="Example: I'm preparing for CSC108 exam.">
                </p>
                <p>Detailed information:<br>
                    <input type="text" style="width: 100%" 
                    placeholder="Want some help on learning how to read files.">
                </p>
                <p>I'm willing to pay up to: TODO: corresponding number<br>
                    <input type="range">
                </p>
                <p>I need help by:<br>
                    <input type="radio" name="radio" id="now">Now
                    <input type="radio" name="radio" id="tmr">Tomorrow
                    <input type="radio" name="radio" id="eow">End of Week
                </p>
                <input type="submit" value="Post">
            </form>`;
        $("#main-div").append(form);
    }
}

$(document).ready(function() {
    dashboard.init();
});
