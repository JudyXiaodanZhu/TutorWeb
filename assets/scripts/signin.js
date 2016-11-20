'use strict';

var signin = {};
var canSubmit = false;

signin.init = function() {
    $("#login-form").submit(function(event) {
        event.preventDefault();
        let json_raw = $(this).serializeArray();
        let json_submit = {};
        for (let i = 0; i < json_raw.length; i++) {
            json_submit[json_raw[i].name] = json_raw[i].value;
        }
        $.post("/login", json_submit, function(result) {
            let status = result.status;
            if (status === 1) $("#error-message").text("Username not exists");
            else if (status === 2) $("#error-message").text("Wrong password");
            else if (status === 0) {
                setCookie("user", JSON.stringify(result.userdata), 1);
                window.location = "/dashboard";
            }
        })
    });
}

$(document).ready(function() {
    signin.init();
});
