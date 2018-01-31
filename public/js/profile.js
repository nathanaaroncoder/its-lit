// $(document).ready(function() {
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(function(data) {
//     $(".member-name").text(data.email);
//   });
// });

$(document).ready(function() {

  var thisUserId;

    // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    // $(".member-name").text(data.email);
    thisUserId = data.UserId;

    console.log("thisUserId " + thisUserId);

    var bookId = $(".button-borrow").attr("data-bookId", thisUserId);

  //get the user id
  // var test = JSON.stringify(elisheva, null, 2)
    console.log("Now thisUserId " + thisUserId);

    $.ajax({
      method: "GET",
      url: "/api/books",
      data: {
      UserUserId: thisUserId
      }
    }).then(function(data){
      console.log(data);

    //empty the book container
    // $(".book-container").empty();


      for (let i = 0; i < data.length; i++) {
        var newTitle = $("<h5>");
        newTitle.text("Title: ");
        newTitle.append($("<span>").text(data[i].title));
        var newAuthor = $("<h5>");
        newAuthor.text("Author: ");
        newAuthor.append($("<span>").text(data[i].author));
        var newButton = $("<button>");
        newButton.addClass("waves-effect waves-light btn button-borrow");
        newButton.attr("data-bookid", data[i].id);
        newButton.attr("data-checkedout", data[i].checkedOut);
      
        if (data[i].checkedOut){
          newButton.text("Check In");
          newButton.removeClass("red");

        }
        else {
          newButton.text("Check Out");
          newButton.addClass("red");
        }
    
        $(".book-container").append(newTitle);
        $(".book-container").append(newAuthor);
        $(".book-container").append(newButton);
      }
    });

  });



  $(document).on("click", ".button-borrow", function(){
    console.log("THIS: " + $(this));
    var thisButton = $(this);
    var isCheckedOut = $(this).attr("data-checkedout");
    console.log("Up here: " + $(this).attr("data-checkedout"));

    
    var id = $(this).attr("data-bookid");
    console.log("ID: " + id);

    if (isCheckedOut === "true"){
      checkIn();
    }
    else {
      checkOut();
    }




    function checkIn(){
      $.ajax({
        type: "PUT",
        url: "/api/books/" + id + "/false",
        data: {
        id: id
        // checkedOut: false
        }
      }).then(function(){
        // isCheckedOut = false;
        thisButton.text("Check Out");
        thisButton.addClass("red");
        thisButton.attr("data-checkedOut", false);
        console.log("ID in AJAX" + id);
      });
    }

    function checkOut(){
      $.ajax({
        type: "PUT",
        url: "/api/books/" + id + "/true",
        data: {
          id: id
          // checkedOut: true
        }
      }).then(function(){
        // isCheckedOut = true;
        thisButton.text("Check In");
        thisButton.removeClass("red");
        thisButton.attr("data-checkedOut", true);
        
      });
    }
       
  }); 


});