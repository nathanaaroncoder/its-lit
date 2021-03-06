
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
    
        var card = $("<div class='card col s4' style='width: 400px; padding: 10px; margin: 10px;'>");
        var newTitle = $("<h5>");
        newTitle.text("Title: ");
        newTitle.append($("<span>").text(data[i].title));
        var newAuthor = $("<h5>");
        newAuthor.text("Author: ");
        newAuthor.append($("<span>").text(data[i].author));
        var newButton = $("<button>");
        newButton.addClass("waves-effect waves-light btn button-borrow orange");
        newButton.attr("data-bookid", data[i].id);
        newButton.attr("data-checkedout", data[i].checkedOut);
      
        if (data[i].checkedOut){
          newButton.text("Check In");
          newButton.removeClass("red");
          newButton.addClass("orange");

        }
        else {
          newButton.text("Check Out");
          newButton.removeClass("orange");
          newButton.addClass("red");
        }
    
        card.append(newTitle);
        card.append(newAuthor);
        card.append(newButton);

        $(".book-container").append(card);
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
        thisButton.removeClass("orange");
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
        thisButton.addClass("orange");
        thisButton.attr("data-checkedOut", true);
        
      });
    }
       
  }); 


});