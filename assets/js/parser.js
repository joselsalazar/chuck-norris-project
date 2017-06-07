// Initialize Firebase
var config = {
  apiKey: "AIzaSyB3Iobm7GjLzr9jv4mW1E7zo5Jev-dZg0U",
  authDomain: "chuck-norris-storage-f4d7f.firebaseapp.com",
  databaseURL: "https://chuck-norris-storage-f4d7f.firebaseio.com",
  projectId: "chuck-norris-storage-f4d7f",
  storageBucket: "chuck-norris-storage-f4d7f.appspot.com",
  messagingSenderId: "443783261542"
};

// Firebase variables
firebase.initializeApp(config);
var database = firebase.database();
var queryURL = "http://api.icndb.com/jokes/"

// Run AJAX Functions to Mass Add Jokes to FIrebase DB
$.ajax({
	url: queryURL,
	method: "GET"
})
.done(function(response) {
	
	for (var i =0; i < response.value.length; i++) {
	console.log(response.value[i].joke);
	var joke = response.value[i].joke;
		database.ref("chuckJokes").push({
		  joke: joke
	});
	};
})