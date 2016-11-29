'use strict';
//Raymond Begins.........
var search = {};

search.init = function() {
  $("a[id^='add-course']").css("cursor", "pointer").click(function() {
    let code = this.id.substring(11,this.id.length);
    $.post('/addCourse', {code: code},function(response){
      console.log(response); // make 'Success' as response here
    });
  });

  $("a[id^='add-friend']").css("cursor", "pointer").click(function(){
    let username = this.id.substring(11,this.id.length);
    $.post('/makeFriends', {username: username}, function(response){
      console.log(response); //make 'Success' as response here
    })
  })
}

$(document).ready(function() {
    search.init();
});
//Raymond Ends......
