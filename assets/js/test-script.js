// Initialize Firebase
var config = {
  apiKey: "AIzaSyB3Iobm7GjLzr9jv4mW1E7zo5Jev-dZg0U",
  authDomain: "chuck-norris-storage-f4d7f.firebaseapp.com",
  databaseURL: "https://chuck-norris-storage-f4d7f.firebaseio.com",
  projectId: "chuck-norris-storage-f4d7f",
  storageBucket: "chuck-norris-storage-f4d7f.appspot.com",
  messagingSenderId: "443783261542"
};

firebase.initializeApp(config);
var database = firebase.database();

// Variables
const APIKey = "dc6zaTOxFJmzC";

// Initialize Variables
var queryURL = "";
var query = "";
var randomQuery = [];
var chuckAnswer = "";
var joke = "";
var title = "";

// Empties Form
function emptyAll() {
  $('.chuck-jokes').find('input[type=text]').val("");
}

// Click Function 
$("#submit-jokes").click(function() {
  joke = $("#joke").val().trim();
  pushChuck();
});

// Submit Jokes to Firebase
database.ref("chuckJokes").orderByKey().startAt("chuck").endAt("chuck\uf8ff").on("child_added", function(snapshot) {
  console.log(snapshot.key());
});

// END SUBMIT PAGE

// AJAX Function
function sendToAjax() {
  event.preventDefault();
  query = $('#query').val().trim();
  queryURL = "https://chuck-norris-storage-f4d7f.firebaseio.com";
  runAJAX();
  assignGifs();
  emptyAll();
}

// AJAX Call For Chuck Norris Facts
function runAJAX() {
$.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(response);
  });
}

