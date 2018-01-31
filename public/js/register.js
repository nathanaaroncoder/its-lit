

//  $(document).ready(function () {
//  	var moment = require('moment');

//  	var userId = moment().format("x");
//  	console.log(userId);

// 	var formOne = $("#formOne");
// 	var visible = true;

// 	var formTwo = $("#formTwo");
// 	formTwo.hide();
	
// 	function formProgress() {
// 		if (visible === false) {
// 			formTwo.hide();
// 			return;
// 		}
// 		if (visible === true) {
// 			formTwo.show();
// 			formOne.hide();
// 			visible = false;
// 			return;
// 		}
// 	}

// 	$('select').material_select();

// 	$(".submitBtn").on("click", function() {		
// 		formProgress();
// 	});


// // The code below successfully creates an object with info from the first two slides!

// 	// $("#updateGen").on("click", function () {})
// 	$("#userSubmit").on("click", function () {
// 		var newProfile = {
// 		name: $("#name").val().trim(),
// 		city: $("#city").val().trim(),	
// 		state: $("#state").val().trim(),
// 		password: $("#password").val().trim(),
// 		email: $("#email").val().trim()
// 		}

// 			$.ajax("/api/users", {
// 			type: "POST",
// 			data: newProfile,
// 		}).then(function(data) {
// 			console.log("Hi")
// 	})
// 	})
		
// 	$("#bookSubmit").on("click", function (data) {

// 		console.log(data);

// 			$.ajax("/api/user_data", {
// 			type: "GET"
// 		}).then(function(data) {
		
// 		console.log("Hi")})
// 		// var firstBook = {
// 		// 	title: $("#title1").val().trim(),
// 		// 	author: $("#author1").val().trim(),
// 		// 	genre: $( "select#dropdown1 option:checked" ).val(),
// 		// 	UserId: data.id

// 		// }

// 		// var secondBook = {
// 		// 	title: $("#title2").val().trim(),
// 		// 	author: $("#author2").val().trim(),
// 		// 	genre: $( "select#dropdown2 option:checked" ).val(),
// 		// 	UserId: data.id 
// 		// }

// 		// var thirdBook = {
// 		// 	title: $("#title3").val().trim(),
// 		// 	author: $("#author3").val().trim(),
// 		// 	genre: $( "select#dropdown3 option:checked" ).val(),
// 		// 	UserId: data.id			
// 		// }

// 		// var bookList = [firstBook, secondBook, thirdBook];

// 		// for (var i = 0; i < bookList.length; i++) {
// 		// 	$.ajax("/api/books", {
// 		// 	type: "POST",
// 		// 	data: bookList[i],
// 		// }).then(function(data) {
// 		// 	console.log("Hi")
// 		// 	console.log(data);
// 		// });
// 		// }	
// 		// });
		


// 	})

//  //    $.ajax("/new",{
//  //      type: "POST",
//  //      data: newBurger,
//  //    }).then(function(data){
//  //        getBurgers();
//  //        location.reload();

//  //    });
  

//  })


function register () {
 $(document).ready(function () {
 	var moment = require('moment');

 	var userId = moment().format("x");
 	console.log(userId);

	var formOne = $("#formOne");
	var visible = true;

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


// The code below successfully creates an object with info from the first two slides!

	// $("#updateGen").on("click", function () {})
	$("#userSubmit").on("click", function () {
		var newProfile = {
		name: $("#name").val().trim(),
		city: $("#city").val().trim(),	
		state: $("#state").val().trim(),
		password: $("#password").val().trim(),
		email: $("#email").val().trim()
		}

			$.ajax("/api/users", {
			type: "POST",
			data: newProfile,
		}).then(function(data) {
			console.log("Hi")
	})
	})
		
	$("#bookSubmit").on("click", function (data) {

		console.log(data);

			$.ajax("/api/user_data", {
			type: "GET"
		}).then(function(data) {
		
		console.log("Hi")})
		// var firstBook = {
		// 	title: $("#title1").val().trim(),
		// 	author: $("#author1").val().trim(),
		// 	genre: $( "select#dropdown1 option:checked" ).val(),
		// 	UserId: data.id

		// }

		// var secondBook = {
		// 	title: $("#title2").val().trim(),
		// 	author: $("#author2").val().trim(),
		// 	genre: $( "select#dropdown2 option:checked" ).val(),
		// 	UserId: data.id 
		// }

		// var thirdBook = {
		// 	title: $("#title3").val().trim(),
		// 	author: $("#author3").val().trim(),
		// 	genre: $( "select#dropdown3 option:checked" ).val(),
		// 	UserId: data.id			
		// }

		// var bookList = [firstBook, secondBook, thirdBook];

		// for (var i = 0; i < bookList.length; i++) {
		// 	$.ajax("/api/books", {
		// 	type: "POST",
		// 	data: bookList[i],
		// }).then(function(data) {
		// 	console.log("Hi")
		// 	console.log(data);
		// });
		// }	
		// });
		


	})

 //    $.ajax("/new",{
 //      type: "POST",
 //      data: newBurger,
 //    }).then(function(data){
 //        getBurgers();
 //        location.reload();

 //    });
  

 })

}

module.exports = register;