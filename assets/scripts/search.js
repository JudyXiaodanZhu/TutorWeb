'use strict';

var search = {};

search.init = function() {

  $("a[id^='add-course']").css("cursor", "pointer").click(function() {
    console.log("!!!")
  });
}

$(document).ready(function() {
    search.init();
});
