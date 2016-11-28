'use strict';
//Raymond Begins.........
var search = {};

search.init = function() {
  //get the current logged-in user's username first..
  var myName;

  $.get('/getMyUserName',function(response){
    //console.log(response);//works..
    myName = response;
  })

  //console.log(session.user.username); doesn't work since it is client side.

  $("a[id^='add-course']").css("cursor", "pointer").click(function() {
    let temp = this.id.substring(11,this.id.length);
    console.log(temp);//works..
    console.log(myName); //works.
    //make an http request here..
    //Important note: use & below instead of ?
    $.get('/addCourse?course=' + temp + '&myName=' + myName,function(response){
      console.log(response); // make 'Success' as response here
    });
  });

  $("a[id^='add-friend']").css("cursor", "pointer").click(function(){
    //console.log(this.id);//works..
    let temp = this.id.substring(11,this.id.length);
    console.log(temp); //works..
    console.log(myName); //works..
    //make an http request here..
    //Important note: use & below instead of ?
    $.get('/makeFriends?f1=' + temp + '&f2=' + myName, function(response){
      console.log(response); //make 'Success' as response here
    })
  })
}

$(document).ready(function() {
    search.init();
});
//Raymond Ends......
