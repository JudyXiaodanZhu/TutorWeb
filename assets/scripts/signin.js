'use strict';

var signin = {};

signin.init = function() {
    $("#signup-form").submit(function(event) {
        event.preventDefault();
        let json_raw = $(this).serializeArray();
        let json_submit = {};
        for (let i = 0; i < json_raw.length; i++) {
            json_submit[json_raw[i].name] = json_raw[i].value;
             console.log(json_raw[i].value);
        }

        $.post("/signup", json_submit, function(result) {
            let status = result.status;
            console.log(status);
            if (status === 1) $("#error-message").text("User already exists");
            else if (status === 0) {
                console.log("here");
                window.location = "/dashboard";
            }
        })
    });
}

$(document).ready(function() {
    signin.init();
});