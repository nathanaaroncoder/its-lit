$(document).ready(function(){


  var thisUserId;

  var userPreferences = [];

  var dataLen;
  var dataStorage;
  var tempIndex = 0;
  var distance;
  var userAddress;
  var ownerAddress;
    // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    // $(".member-name").text(data.email);
    thisUserId = data.UserId;

    console.log("thisUserId " + thisUserId);


  //get the user id
    console.log("Now thisUserId " + data.UserId);

   //get the user object (info about the user) based on the userid
    $.ajax({
      method: "GET",
      url: "/api/users/" + thisUserId,
      data: {
      UserUserId: thisUserId
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


      	// if user didn't choose any genres
      if (userPreferences.length <= 0){

      // get all the books 
      $.ajax({
      method: "GET",
      url: "/api/books/",
          	
      }).then(function(data){
      console.log(data);

     dataLen = data.length;
     dataStorage = data;
     console.log("dataLen: " + dataLen)

     findNewBook(dataStorage[tempIndex]);

    

            // get the user info - to get their location
            ////// i think this is uneccessary because we already got their info above
            $.ajax({
                method: "GET",
                url: `/api/users/${thisUserId}`
              }).then(function(data){
                userAddress = `${data.city}${data.state}`;
                ownerAddress = `${dataStorage[tempIndex].User.city}${dataStorage[tempIndex].User.state}`;
  
                findDistance(userAddress,ownerAddress);
                console.log(userAddress);
                console.log(ownerAddress);
                console.log(distance);
              })
            
            
    })

    }

    //otherwise create queryUrl based on their preferences
    else{

   		var queryUrl = "/api/books/" + thisUserId + "/";

   		for (var i = 0; i < userPreferences.length; i++) {
   			queryUrl += userPreferences[i] + "/"
   		}

   			// get the books that match their preferences, are checked in, 
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

            console.log("dataStorage[tempIndex]")
            console.log(dataStorage[tempIndex])
            console.log("dataStorage[tempIndex].User.name")
            console.log(dataStorage[tempIndex].User.name)
            findNewBook(dataStorage[tempIndex]);


            // get the user info - to get their location
            ////// i think this is uneccessary because we already got their info above
            $.ajax({
                method: "GET",
                url: `/api/users/${thisUserId}`
              }).then(function(data){
                userAddress = `${data.city}${data.state}`;
                ownerAddress = `${dataStorage[tempIndex].User.city}${dataStorage[tempIndex].User.state}`;
  
                findDistance(userAddress,ownerAddress);
                console.log(userAddress);
                console.log(ownerAddress);
                console.log(distance);
              })
            
           
  
              
 
      })

    }

    }); 
  
  
  });

  

      function findDistance (userAddress, ownerAddress) {
          var proxy = 'https://cors-anywhere.herokuapp.com/';
          queryUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userAddress}&destinations=${ownerAddress}&key=AIzaSyCPuyAmcaGASa9ymUw16xO4oRTaSde7fv0`
         // google maps get - to get distance
          $.ajax({
                  method: "GET",
                  url: proxy+queryUrl
                }).then(function(data){
                    console.log("hopefully the distance")
                    console.log(data.rows[0].elements[0].distance.text);
  
                  distance =  (data.rows[0].elements[0].distance.text);

                  $("#modal-text").append($("<br>"));
                  $("#modal-text").append($(`<i class='small material-icons'>account_circle</i>`));           
                  $("#modal-text").append(`  ${dataStorage[tempIndex].User.name} has this book and is ${distance} away from you`);
                //   $("#modal-text").append($("<br>"));
                //   $("#modal-text").append($("<br>"));
                //   $("#modal-text").append(` This user is ${distance} away from you`);
                  $("#modal-text").append($("<br>"));
                  $("#modal-text").append($("<br>"));
                  var newMailTo = $("<a>");
                  newMailTo.attr("href", "mailto:" + dataStorage[tempIndex].User.email + "?Subject=Your%20Book%20is%20Lit");
                  newMailTo.text("here");
                  $("#modal-text").append($("<i class='small material-icons'>email</i>"));
                  $("#modal-text").append(`  Email `);
                  $("#modal-text").append(dataStorage[tempIndex].User.name);
                  $("#modal-text").append(" ");
                  $("#modal-text").append(newMailTo);

                  tempIndex++;
                })
      }


    function findNewBook(bookData){
        

        $("#book-cover").empty();
        $("#book-info").empty();
        $("#modal-text").empty();

     
                
        var bookImg = $("<img>");

        console.log(bookData.picLink)
	      bookImg.attr("src", bookData.picLink);  

        
        
        bookImg.addClass("book-image");
        $("#book-cover").prepend(bookImg);



        var bookTitle = $("<h5>");
        bookTitle.text(`Title: ${bookData.title}`);
        console.log(bookData.title)
        bookTitle.append("<br><br>");
        $("#book-info").prepend(bookTitle);
        $("#modal-title").text(bookData.title);
        

        var bookAuthors = $("<h5>");
        bookAuthors.prepend("Authors: ")
        
        bookAuthors.append(bookData.author);
        console.log("author: (next line)")
        console.log(bookData.author)

        bookAuthors.append("<br><br>");
        $("#book-info").append(bookAuthors);

	            

        var descripDiv = $("<div>");
        var bookDescripHead = $("<h5>");
        bookDescripHead.text("Description:");
        var bookDescrip = $("<p>");
        console.log(bookData.description)
        bookDescrip.html(bookData.description);
        descripDiv.append(bookDescripHead);
        descripDiv.append(bookDescrip);
        descripDiv.append("<br><br>");
        $("#book-info").append(descripDiv);
            

        // tempIndex++;
        }
    //   });

    // }




    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
$('#modal1').modal();

$(document).on("click", "#lit", function(){
		if (tempIndex < dataLen){ 
    	findNewBook(dataStorage[tempIndex]);
    	ownerAddress = `${dataStorage[tempIndex].User.city}${dataStorage[tempIndex].User.state}`;
  
                findDistance(userAddress,ownerAddress);
                console.log(userAddress);
                console.log(ownerAddress);
                console.log(distance);
  } else {
      alert("Those are all the books with genres you like!");
  }
});

$(document).on("click", "#dislike", function(){
    if (tempIndex < dataLen){ 
    	findNewBook(dataStorage[tempIndex]);
    	ownerAddress = `${dataStorage[tempIndex].User.city}${dataStorage[tempIndex].User.state}`;
  
                findDistance(userAddress,ownerAddress);
                console.log(userAddress);
                console.log(ownerAddress);
                console.log(distance);
  } else {
    alert("Those are all the books with genres you like!");
}
});






});
   