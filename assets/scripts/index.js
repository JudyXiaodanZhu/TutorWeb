var tutorApp = {};

tutorApp.init = function() {
    $("#signup-button").click(function() {
        $("#popup-div").prop("hidden", false);
        $("#type-row").prop("hidden", false);
        $("#submit-button").val("Join us").off("click").click(function() {
            data = {};
            data["username"] = $("#username-input").val();
            data["password"] = $("#password-input").val();
            data["type"] = $('input[name=type]:checked').val();
            $.post("/signup", data, function(result) {
                // TODO
            })
        });
    });

    $("#login-button").click(function() {
        $("#popup-div").prop("hidden", false);
        $("#type-row").prop("hidden", true);
        $("#submit-button").val("Log in").off("click").click(function() {
            data = {};
            data["username"] = $("#username-input").val();
            data["password"] = $("#password-input").val();
            $.post("/login", data, function(result) {
                // TODO
            })
        });
    });

    $("#close-button").click(function() {
        $("#popup-div").prop("hidden", true);
    });
}

$(document).ready(function() {
    tutorApp.init();
});
