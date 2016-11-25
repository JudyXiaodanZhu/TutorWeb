'use strict';

var dashboard = {};

dashboard.init = function() {
    $("#post-form").submit(function(event) {
        event.preventDefault();
        let json_raw = $(this).serializeArray();
        let json_submit = {};
        for (let i = 0; i < json_raw.length; i++) {
            json_submit[json_raw[i].name] = json_raw[i].value;
        }
        $.post("/postStudentRequest", json_submit, function(result) {
            let status = result.status;
            if (status === 1) $("#form-feedback").text("Form incomplete");
            else if (status === 0) {
                $("#post-form")[0].reset();
                $("#form-feedback").text("Post successfully");
            }
        });
    });

    $("#pay").on("input", function() {
        $("#pay-amount").text("$ " + $(this).val() + " / hour");
    })
}

$(document).ready(function() {
    dashboard.init();
});
