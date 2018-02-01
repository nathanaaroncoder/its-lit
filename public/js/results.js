$(document).ready(function(){
    var dataStorage;
    
    $('#modal1').modal();

    var startGal = $('.start-gallery'); //EVERYTHING 
    var pID = $('<div id="portfolio" class="section gray">');
    var container = $('<div class="container">');
    var row = $(' <div class="gallery row">');

    pID.appendTo(startGal); // pid is in the gallery id, container is in pid, row is in container
    container.appendTo(pID);
    row.appendTo(container);

    // get all the books from our database
    $.ajax({
    method: "GET",
    url: "/api/books/",
            
    }).then(function(results){
    console.log(results);

  //   dataLen = data.length;
      dataStorage = results;
      var horrorStorage = [];
      var yaStorage = [];
      var fantasyStorage = [];
      var actionStorage = [];
      var mysteryStorage = [];
      var classicStorage = [];

      // push each book object into the correct array (by genre)
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

      // when click on the different tabs for all/specific genre
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
      });

      //when user clicks on an item in the gallery
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

      
    // show all books on page load
    showBooks(results);
    
    });



        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }


    function showBooks(data){

      row.empty();

      for (let i = 0; i < data.length; i++) {

        
        var bookTitle = data[i].title;
        var bookAuthors = data[i].author;
        var bookGenre = data[i].genre;
        var bookCover = data[i].picLink;

        // var answer = response.items;
        // var bookTitle = answer[0].volumeInfo.title;
        // var bookAuthors = answer[0].volumeInfo.authors;
        // var bookYear = answer[0].volumeInfo.publishedDate;
        // var bookCategories = data[i].genre;
        //var bookCover = answer[0].volumeInfo.imageLinks.thumbnail;



          bookGenre = capitalizeFirstLetter(bookGenre);

        if (bookCover) {
          console.log("inside if");
          console.log("answer is: " + bookTitle + " categories: " + bookGenre + " || " +
              "pic:  " + bookCover);
        
          var column = $('<div class="col m6 s12 gallery-item gallery-horizontal gallery-expand">');
           //gallery-filter GENRE FROM DB
           var modalATag = $("<a>");

          var allIndex = dataStorage.indexOf(data[i]);
          console.log("allIndex: " + allIndex);

           column.attr("data-storageIndex", allIndex);
           modalATag.attr("href", "#modal1");
           modalATag.addClass("modal-trigger");
          var curveWrap = $(' <div class="gallery-curve-wrapper">');
          var aWrap = $('<a class="gallery-cover gray" style="height: 250px; width: 170px;">');
          var imgTag = $('<img src="' + bookCover + '" alt="placeholder" style="height: 250px;">');
          var galleryHeader = $('<div class="gallery-header" style="height: 250px;">');
          galleryHeader.html('<h5>' + bookTitle + '</h5>' + '<p>Author(s): ' + bookAuthors +
              '<br> Genre: ' + bookGenre + '</p>');
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
            console.log("book with no cover: " + bookTitle + "n/-------------")
            console.log("no cover found");
        }

                  // google.books.setOnLoadCallback(initialize);
      
      }
        };
  
      
  
          
      
    });
    
 