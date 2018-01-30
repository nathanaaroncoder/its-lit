$(document).ready(function(){

    function findNewBook(){
        $("#book-cover").empty();
        $("#book-info").empty();

        $.ajax({
            method: "GET",
            url: "https://www.googleapis.com/books/v1/volumes?q=frankenstein&key=AIzaSyCeH0ntzIH5qUGfnIumk6woxDQp7mRZDlA"
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
                bookImg.attr("src", bookInfo.imageLinks.extraLarge);
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
                bookDescrip.text(bookInfo.description);
                descripDiv.append(bookDescripHead);
                descripDiv.append(bookDescrip);
                descripDiv.append("<br><br>");
                $("#book-info").append(descripDiv);
                   
                
                });
      });

    }

findNewBook();


    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
$('#modal1').modal();

$(document).on("click", "#like", function(){
    findNewBook();
});

$(document).on("click", "#dislike", function(){
    findNewBook();
});

});
   