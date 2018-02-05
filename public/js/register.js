$(document).ready(function () {
    var userId = moment().format("x").toString();
    var formOne = $("#formOne");
    var visible = true;
    var emailInput;
    var passwordInput;


    var formTwo = $("#formTwo");
    formTwo.hide();
  
    function formProgress() {
      if (visible === false) {
        formTwo.hide();
        return;
      }
      if (visible === true) {
        formTwo.show();
        formOne.hide();
        visible = false;
        return;
      }
    }

    $('select').material_select();

    $(".submitBtn").on("click", function() {    
      formProgress();
    });


  $(".iconBox").on("click", function () {
    
    $(this).addClass("orange");
    var changedGenre = $(this).find("h5").text().toLowerCase();

    //use conditional if the tile clicked on is action/adventure or Young Adult
    //so that it matches the column name in the database
    if (changedGenre == "action/adventure"){
      changedGenre = "action";
    }
    if (changedGenre == "young adult"){
      changedGenre = "YA";
    }

    $.ajax(`/api/users/${userId}/${changedGenre}`, {
      type: "PUT",
      data: {}
    }).then(function(data) {
      console.log("data nect line: ")
      console.log(data)
      console.log("Genre Changed!")
    
      
    
    });

  }); 

  $("#updateGen").on("click", function () {

    var newProfile = {
    name: $("#name").val().trim(),
    city: $("#city").val().trim(),  
    state: $("#state").val().trim(),
    password: $("#password").val().trim(),
    email: $("#email").val().trim(),
    UserId: userId
    }

    $.ajax("/api/users", {
      type: "POST",
      data: newProfile,
    }).then(function(data) {
      console.log("Hi")
    })
  })




  $("#seeMatches").on("click", function () {

  
    console.log(emailInput);
    console.log(passwordInput);
    

    loginUser(emailInput, passwordInput);
    emailInput.val("");
    passwordInput.val("");

  })

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }





  $("#userSubmit").on("click", function () {
    emailInput = $("#email").val().trim();
        passwordInput = $("#password").val().trim();

    $("#dynamic-header").text("What Books Can You Lend?");

    var newProfile = {
    name: $("#name").val().trim(),
    city: $("#city").val().trim(),  
    state: $("#state").val().trim(),
    password: $("#password").val().trim(),
    email: $("#email").val().trim(),
    UserId: userId
    }

    $.ajax("/api/users", {
      type: "POST",
      data: newProfile,
    }).then(function(data) {
      console.log("User Submitted")})
  })


    
  $("#bookSubmit").on("click", function () {
    $("#dynamic-header").text("Which Genres Do You Prefer?");
    $.ajax("/api/user_data", {
      type: "GET"
    }).then(function(data) {
    
    console.log("Hi")})
    var firstBook = {
      title: $("#title1").val().trim(),
      author: $("#author1").val().trim(),
      genre: $( "select#dropdown1 option:checked" ).val(),
      UserUserId: userId

    }

    var secondBook = {
      title: $("#title2").val().trim(),
      author: $("#author2").val().trim(),
      genre: $( "select#dropdown2 option:checked" ).val(),
      UserUserId: userId 
    }

    var thirdBook = {
      title: $("#title3").val().trim(),
      author: $("#author3").val().trim(),
      genre: $( "select#dropdown3 option:checked" ).val(),
      UserUserId: userId      
    }

    var apiPicLink;
    var apiDescription;
    var bookList = [];
    console.log("FIRST BOOK BELOW:")
    console.log(firstBook);
    console.log("second BOOK BELOW:")
    console.log(secondBook)
    console.log("third BOOK BELOW:")
    console.log(thirdBook)

    if (firstBook.title && firstBook.author){
    bookList.push(firstBook);
    console.log(bookList);
    }

    if (secondBook.title && secondBook.author){
    bookList.push(secondBook);
    console.log(bookList);
    }

    if (thirdBook.title && thirdBook.author){
      bookList.push(thirdBook);
      console.log(bookList); 
    }
  
    for (var i = 0; i < bookList.length; i++) {

      findBookApiInfo(bookList[i])
      
    }

    
  }); //close book submit

// we do this function so we don't have to keep going back to the googleBooksAPI each time we want to display a book cover
  function findBookApiInfo(bookObj){
    console.log("TITLE");
    console.log(bookObj.title);

    // removing characters and spaces from the title and switch to lower case
    var thisTitle = bookObj.title.split(" ");
    thisTitle = thisTitle.join("");
    if (thisTitle.indexOf(".") > -1){
        thisTitle = thisTitle.split(".");
        thisTitle = thisTitle.join("");
    }
    if (thisTitle.indexOf("'") > -1){
        thisTitle = thisTitle.split("'");
        thisTitle = thisTitle.join("");
    }
    thisTitle = thisTitle.toLowerCase();
    console.log("thisTitle: " + thisTitle);


    console.log("AUTHOR");
    console.log(bookObj.author);
    // removing characters and spaces from the author
    var thisAuthor = bookObj.author.split(" ");
    thisAuthor = thisAuthor.join("");
    if (thisAuthor.indexOf(".") > -1){
        thisAuthor = thisAuthor.split(".");
        thisAuthor = thisAuthor.join("");
    }
    if (thisAuthor.indexOf("'") > -1){
        thisAuthor = thisAuthor.split("'");
        thisAuthor = thisAuthor.join("");
    }
    thisAuthor = thisAuthor.toLowerCase();
    console.log("thisAuthor: " + thisAuthor);


    // $("#book-cover").empty();
    // $("#book-info").empty();

    // APi ajax call to get the api bookId
    $.ajax({
      method: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=" + thisTitle + "+author=" + thisAuthor + "&filter=ebooks&key=AIzaSyDyCXyFyEjjLb65OS1FWCWvIbdcCE0EAAA"
    }).then(function(data){
      console.log(data.items[0].id);
      var gBookId = data.items[0].id;

      // using the bookId do another API ajax call to get the cover and description
      $.ajax({
        method: "GET",
        url: "https://www.googleapis.com/books/v1/volumes/" + gBookId
      }).then(function(data){
        console.log(data.volumeInfo);
        var bookInfo = data.volumeInfo;

        // take the large picture if it exists
        if (bookInfo.imageLinks.large){
          apiPicLink = bookInfo.imageLinks.large
          console.log("apiPicLink " + apiPicLink)
          bookObj.picLink = apiPicLink;
        } 
        // otherwise take the thumbnail
        else {
          apiPicLink = bookInfo.imageLinks.thumbnail
          console.log("apiPicLink " + apiPicLink)
          bookObj.picLink = apiPicLink;
        }

        apiDescription = bookInfo.description;
        console.log("apiDescription", apiDescription);
        bookObj.description = apiDescription;
        // bookDescrip.html(bookInfo.description);

        console.log("bookObj down here")
        console.log(bookObj)

        // now - post the book obj (which includes the link and description to our database)

        $.ajax("/api/books", {
          type: "POST",
          data: bookObj,
        }).then(function(data) {
          console.log("Book Submitted")
          console.log(data);
        });
            
            
      });
    });

  }

});
    
