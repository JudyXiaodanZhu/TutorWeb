'use strict';

var dashboard = {};


//append search result at search.html by using res.render() , using template
//need to specify the template of search.html

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

    $("#post-form-tut").submit(function(event) {
        event.preventDefault();
        let json_raw = $(this).serializeArray();
        let json_submit = {};
        for (let i = 0; i < json_raw.length; i++) {
            json_submit[json_raw[i].name] = json_raw[i].value;
        }
        $.post("/postTutorRequest", json_submit, function(result) {
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


//Raymond Begins..............
    //onclick handler for the search button...
    //backend and frontend connection works now..
    $('#searchSubmit').submit(function(e){
      e.preventDefault()
      var entered = $('#searchContent').val();
      var type = searchContentType(entered);
      if(type === -1){ //invalid search, thus do not send http request
          window.alert('Please modify your search field and try again');
      }else if(type === 0){ //tutor name
          //window.alert('0'); //type check works
          window.location = '/search?tutorName=' + entered;
          /*$.get('/search?tutorName=' + entered, function(response){
              //window.alert(response); works  front -> back ->front(response) works
              if(response.length !== 0){
                console.log(response);
              }else{
                window.alert('No search tutor name');
              }
          })*/
      }else if(type === 3){ //3-char course code
          //window.alert('3'); //type check works
          window.location = '/search?shortCourseCode=' + entered;
          /*$.get('/search?shortCourseCode=' + entered, function(response){
              // window.alert(response); works  front -> back ->front(response) works
              if(response.length !== 0){
                console.log(response);
              }else{
                window.alert('No such course code');
              }
          })*/
      }else if(type === 6){ //6-char course code
          //window.alert('6'); //type check works
          window.location = '/search?completeCourseCode=' + entered;
          /*$.get('/search?completeCourseCode=' + entered.toUpperCase(), function(response){
              //window.alert(response); works  front -> back ->front(response) works
              if(response.length !== 0){
                console.log(response);
              }else{
                window.alert('No such course code');
              }
          })*/
      }
    });
}

$(document).ready(function() {
    dashboard.init();
});


//works
//helper function for decides what type of content is being searched..
//-1 means non-valie while
//0 means pure letters without digit
//3 means course code with form ###
//6 means course code with form LLL###
//valid course code(LLL### or ###) where L stands for English letter
function searchContentType(content){
  var length = content.length;
  if(length === 0){
    return -1;
  }else{ //non-empty
    if(checkNum(content) === 0){ //no digit, should represent a tutor name
      return 0;
    }else if(checkNum(content) === 1){ //has at least one digit
        if(length === 3){
            if(!isNaN(content.charAt(0)) && !isNaN(content.charAt(1)) && !isNaN(content.charAt(2))){
                return 3;
            }else{ //incorrect search content
                return -1;
            }
        }else if(length === 6){
            if(isNaN(content.charAt(0)) && isNaN(content.charAt(1)) && isNaN(content.charAt(2))
            && !isNaN(content.charAt(3)) && !isNaN(content.charAt(4)) && !isNaN(content.charAt(5))){
              return 6;
            }else{
              return -1;
            }
        }else{
          return -1;
        }
    }
  }
}


//works
//helper funtion for checking whether a string contains a digit
function checkNum(string){
  var length = string.length;
  if(length == 0){
    return -1; //invalid
  }else{ //user has entered content..
    for(let i = 0; i < length ; i++){
      if(!isNaN(string.charAt(i))){
        return 1; //string has digit
      }
    }
  }
  return 0; //string does not have digit
}
//Raymond Ends......
