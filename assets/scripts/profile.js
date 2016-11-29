'use strict';

var profile = {};

profile.init = function() {
    $("a[id^='remove-course']").css("cursor", "pointer").click(function() {
        let code = $(this).prop("id").substring(14);
        $.post("/removeCourse", {course: code}, function(result) {
            location.reload();
        })
    });

    $("a[id^='remove-friend']").css("cursor", "pointer").click(function() {
        let name = $(this).prop("id").substring(14);
        $.post("/removeFriend", {friend: name}, function(result) {
            location.reload();
        })
    });

    $("a[id^='remove-post']").css("cursor", "pointer").click(function() {
        let id = $(this).prop("id").substring(12);
        $.post("/removeTutorPost", {id: id}, function(result) {
            location.reload();
        })
    });
}

$(document).ready(function() {
    profile.init();
});