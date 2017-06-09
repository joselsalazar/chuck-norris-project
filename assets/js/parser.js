// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyB3Iobm7GjLzr9jv4mW1E7zo5Jev-dZg0U",
//   authDomain: "chuck-norris-storage-f4d7f.firebaseapp.com",
//   databaseURL: "https://chuck-norris-storage-f4d7f.firebaseio.com",
//   projectId: "chuck-norris-storage-f4d7f",
//   storageBucket: "chuck-norris-storage-f4d7f.appspot.com",
//   messagingSenderId: "443783261542"
// };

// // Firebase variables
// firebase.initializeApp(config);
// var database = firebase.database();
// var queryURL = "https://api.chucknorris.io/jokes/search?query=all"

// // Run AJAX Functions to Mass Add Jokes to FIrebase DB
// $.ajax({
// 	url: queryURL,
// 	method: "GET"
// })
// .done(function(response) {
// 	// console.log(response.result[0].value);
// 	for (var i =0; i < response.result.length; i++) {
// 	console.log(response.result[i].value);
// 	var joke = response.result[i].value;
// 		database.ref("chuckJokes").push({
// 		  joke: joke
// 	});
// 	};
// })