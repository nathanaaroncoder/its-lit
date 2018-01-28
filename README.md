# It's Lit!
## What is it?
"It's Lit" is a user-profile centered app that enables users seeking to loan or recieve books from other users in their area. If they are seeking to browse what books to borrow in their area, the user's profile is match with books sotred in a database. In order to expand it, the user can also choose to enter books that they can't find in the database to the list for other users to find. 

## Wireframing
The inital design process is relatively simple- users will be brought to a landing page that requires them to sign up for an account into order to receive content. After they enter books they may have, and the types of books they're interested in, results are shown in a gallery with a module pop-up for users to decide whether they want to "swipe right" on ones they like or "left" on ones they're not interested in.
The mock-up can be viewed here: 

https://app.moqups.com/eririzz/TQx8PmeRVQ/view 

## Psuedo Code

Login/land:
- Sign Up or register
	- POST on Submit
		- Book Table
		- User Table
	- Layout Handlebars

- Login
	- Passport authentication?
	- Get
		- User Table
			- GET/new route
				- Book table
				- if ues, show modal
				- if no, show next

- Profile
	- GET
		- Owned Books
	-Put 
		- checkout book
