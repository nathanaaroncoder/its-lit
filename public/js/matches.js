$(document).ready(function(){


    var thisUserId;

  var userPreferences = [];

  var dataLen;
  var dataStorage;
  var tempIndex = 0;
    // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    // $(".member-name").text(data.email);
    thisUserId = data.id;

    console.log("thisUserId " + thisUserId);


  //get the user id
    console.log("Now thisUserId " + data.id);

    $.ajax({
      method: "GET",
      url: "/api/users/" + thisUserId,
      data: {
      UserId: thisUserId
      }
    }).then(function(data){
      console.log(data);

      if (data.action){
      	userPreferences.push("action");
      }
      if (data.classic){
      	userPreferences.push("classic");
      }
      if (data.fantasy){
      	userPreferences.push("fantasy");
      }
      if (data.horror){
      	userPreferences.push("horror");
      }
      if (data.mystery){
      	userPreferences.push("mystery");
      }
      if (data.YA){
      	userPreferences.push("YA");
      }

      console.log("user preferences " + userPreferences);



    //    $.ajax({
    //   method: "GET",
    //   url: "/api/books/",
          	
    //   }).then(function(data){
    //   console.log(data);
    //   for (var i = 0; i < userPreferences.length; i++) {

    //   	console.log(userPreferences.indexOf("horror"))

    //   	// if the book's genre is in the userPref array
    //   	if (userPreferences.indexOf(data[i].genre) >=0 )
    //   	{
    //   		displayArr.push(data[i])
    //   		console.log("displayArr below")
    //   		console.log(displayArr)
    //   		console.log(displayArr[0])

    //   		console.log(JSON.stringify(displayArr, null, 2))
    //   	}
    //   }

    // })

      if (userPreferences.length <= 0){

      $.ajax({
      method: "GET",
      url: "/api/books/",
          	
      }).then(function(data){
      console.log(data);

    })

    }

    else{

    	var randomNum = Math.floor(Math.random() * userPreferences.length);

    	var randomCategory = userPreferences[randomNum];
   		console.log("random category: " + randomCategory)

   		var queryUrl = "/api/books/" + thisUserId + "/";

   		for (var i = 0; i < userPreferences.length; i++) {
   			queryUrl += userPreferences[i] + "/"
   		}

    	 $.ajax({
      method: "GET",
      url: queryUrl,
      data: {id: thisUserId}
      
    	
      }).then(function(data){

                console.log("data")
            console.log(data);

            console.log(data[0].title);

            dataLen = data.length;
            dataStorage = data;
            console.log("dataLen: " + dataLen)

            findNewBook(dataStorage[tempIndex].title);

            

    })




  }



  }); 


});






    function findNewBook(title){


        $("#book-cover").empty();
        $("#book-info").empty();

        $.ajax({
            method: "GET",
            url: "https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=AIzaSyCeH0ntzIH5qUGfnIumk6woxDQp7mRZDlA"
          }).then(function(data){
              console.log(data.items[0].id);
               var gBookId = data.items[0].id;
    
               $.ajax({
                method: "GET",
                url: "https://www.googleapis.com/books/v1/volumes/" + gBookId
              }).then(function(data){
                  console.log(data.volumeInfo);
                   var bookInfo = data.volumeInfo;
                
                var bookImg = $("<img>");
                bookImg.attr("src", bookInfo.imageLinks.large);
                bookImg.addClass("book-image")
    
                $("#book-cover").prepend(bookImg);

                var bookTitle = $("<h5>");
                bookTitle.text(`Title: ${bookInfo.title}`);
                bookTitle.append("<br><br>");
                $("#book-info").prepend(bookTitle);
                $("#modal-title").text(bookInfo.title);
                

                var bookAuthors = $("<h5>");
                bookAuthors.prepend("Authors: ")
                for (let i = 0; i < bookInfo.authors.length; i++) {
                    bookAuthors.append(bookInfo.authors[i]);
                    
                }
                bookAuthors.append("<br><br>");
                $("#book-info").append(bookAuthors);

                var descripDiv = $("<div>");
                var bookDescripHead = $("<h5>");
                bookDescripHead.text("Description:");
                var bookDescrip = $("<p>");
                bookDescrip.html(bookInfo.description);
                descripDiv.append(bookDescripHead);
                descripDiv.append(bookDescrip);
                descripDiv.append("<br><br>");
                $("#book-info").append(descripDiv);
                   

                tempIndex++;
                });
      });

    }

// findNewBook();


    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
$('#modal1').modal();

$(document).on("click", "#like", function(){
		if (tempIndex < dataLen){ 
    	findNewBook(dataStorage[tempIndex].title);
  }
});

$(document).on("click", "#dislike", function(){
    if (tempIndex < dataLen){ 
    	findNewBook(dataStorage[tempIndex].title);
  }
});

});
   