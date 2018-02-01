$(document).ready(function(){

    $('#modal1').modal();

    var startGal = $('.start-gallery'); //EVERYTHING 
            var pID = $('<div id="portfolio" class="section gray">');
            var container = $('<div class="container">');
            var row = $(' <div class="gallery row">');
    
            pID.appendTo(startGal); // pid is in the gallery id, container is in pid, row is in container
            container.appendTo(pID);
            row.appendTo(container);

    $.ajax({
    method: "GET",
    url: "/api/books/",
            
    }).then(function(results){
    console.log(results);

  //   dataLen = data.length;
      var dataStorage = results;
      var horrorStorage = [];
      var yaStorage = [];
      var fantasyStorage = [];
      var actionStorage = [];
      var mysteryStorage = [];
      var classicStorage = [];
      for (let i = 0; i < results.length; i++) {
         if (results[i].genre === "horror"){
             horrorStorage.push(results[i]);
         }
         if (results[i].genre === "YA"){
          yaStorage.push(results[i]);
          }
          if (results[i].genre === "fantasy"){
              fantasyStorage.push(results[i]);
          }
          if (results[i].genre === "action"){
              actionStorage.push(results[i]);
          }
          if (results[i].genre === "mystery"){
              mysteryStorage.push(results[i]);
          }
          if (results[i].genre === "classic"){
              classicStorage.push(results[i]);
          }
          
      }

      $(document).on("click", "#all", function(){

        showBooks(results);
      });

      $(document).on("click", "#horror", function(){

        showBooks(horrorStorage);
      });

      $(document).on("click", "#classic", function(){

        showBooks(classicStorage);
      });

      $(document).on("click", "#ya", function(){

        showBooks(yaStorage);
      });

      $(document).on("click", "#mystery", function(){

        showBooks(mysteryStorage);
      });

      $(document).on("click", "#action", function(){

        showBooks(actionStorage);
      });

      $(document).on("click", "#fantasy", function(){

        showBooks(fantasyStorage);
        console.log("IS THIS CLICK WORKING???")
      });


      $(document).on("click", ".gallery-item", function(){
        $("#modal-text").empty();


          console.log("Is the gallery item clicking?")
        var index = $(this).attr("data-storageIndex");
        index = parseInt(index);
        console.log(`index: ${index}`);
        console.log(`data storage: ${dataStorage[index].User.name}`);
            $("#modal-title").text(`${dataStorage[index].title}`);
            $("#modal-text").append($("<br>"));
            $("#modal-text").append($(`<i class='small material-icons'>account_circle</i>`));           
            $("#modal-text").append(`  ${dataStorage[index].User.name} has this book`);
            $("#modal-text").append($("<br>"));
            $("#modal-text").append($("<br>"));
            var newMailTo = $("<a>");
            newMailTo.attr("href", "mailto:" + dataStorage[index].User.email + "?Subject=Your%20Book%20is%20Lit");
            newMailTo.text("here");
            $("#modal-text").append($("<i class='small material-icons'>email</i>"));
            $("#modal-text").append(`  Email `);
            $("#modal-text").append(dataStorage[index].User.name);
            $("#modal-text").append(" ");
            $("#modal-text").append(newMailTo);
      });


















      console.log(fantasyStorage);

      
    
        showBooks(results);
    
    });


    function showBooks(data){

      row.empty();

        for (let i = 0; i < data.length; i++) {
  
          var thisTitle = data[i].title.split(" ");
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
         
          var thisAuthor = data[i].author.split(" ");
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
  
          var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + thisTitle + "+author=" + thisAuthor + "&filter=ebooks&key=AIzaSyDyCXyFyEjjLb65OS1FWCWvIbdcCE0EAAA"
          $.ajax({
              url: queryURL,
              method: "GET"
      
          }).done(function(response) {
  
      
                      var answer = response.items;
                      var bookTitle = answer[0].volumeInfo.title;
                      var bookAuthors = answer[0].volumeInfo.authors;
                      var bookYear = answer[0].volumeInfo.publishedDate;
                      var bookCategories = data[i].genre;

                      function capitalizeFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }

                        bookCategories = capitalizeFirstLetter(bookCategories);
                      var bookCover = answer[0].volumeInfo.imageLinks.thumbnail;
      
                      if (bookCover) {
                          console.log("inside if");
                          console.log("answer is: " + bookTitle + " categories: " + bookCategories + " || " +
                              "pic:  " + bookCover);
                          console.log(response.items);
                        
                          var column = $('<div class="col m6 s12 gallery-item gallery-horizontal gallery-expand">');
                           //gallery-filter GENRE FROM DB
                           var modalATag = $("<a>");
                           column.attr("data-storageIndex", i);
                           modalATag.attr("href", "#modal1");
                           modalATag.addClass("modal-trigger");
                          var curveWrap = $(' <div class="gallery-curve-wrapper">');
                          var aWrap = $('<a class="gallery-cover gray" style="height: 250px; width: 170px;">');
                          var imgTag = $('<img src="' + bookCover + '" alt="placeholder" style="height: 250px;">');
                          var galleryHeader = $('<div class="gallery-header" style="height: 250px;">');
                          galleryHeader.html('<h5>' + bookTitle + '</h5>' + '<p>Author(s): ' + bookAuthors +
                              '<br> Genre: ' + bookCategories + '<br>Published: ' + bookYear + '</p>');
                          var galleryBody = $('<div class="gallery-body">');
                          var wrapTitle = $('<div class="title-wrapper">');
      
                        column.appendTo(modalATag);
                          modalATag.appendTo(row);
                          curveWrap.appendTo(column);
                          aWrap.appendTo(curveWrap);
                          imgTag.appendTo(aWrap);
      
                          curveWrap.prepend(galleryHeader);
                          galleryHeader.appendTo(curveWrap);
                          galleryBody.appendTo(galleryHeader);
                          wrapTitle.appendTo(galleryHeader);
                          // past here, the above variables will have all the classes contained within them
      
                          console.log("=========================");
                      } else {
                          console.log("book with no cover: " + answer[k].volumeInfo.title + "n/-------------")
                          console.log("no cover found");
                      }
                
                  // google.books.setOnLoadCallback(initialize);
      
          });
  
      }
  }
          
      
    });
    
 