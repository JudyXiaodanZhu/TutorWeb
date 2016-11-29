'use strict';

var signup = {};

signin.init = function() {
    $("#signup-form").submit(function(event) {
        event.preventDefault();
        let json_raw = $(this).serializeArray();
        let json_submit = {};
        for (let i = 0; i < json_raw.length; i++) {
            json_submit[json_raw[i].name] = json_raw[i].value;
        }

        $.post("/signup", json_submit, function(result) {
            let status = result.status;
            if (status === 1) $("#error-message").text("User already exists");
            else if (status === 0) {
                window.location = "/dashboard";
            }
        })
    });
}

$(document).ready(function() {
    signup.init();
});