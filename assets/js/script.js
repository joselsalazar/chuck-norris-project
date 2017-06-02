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

// Variables
const APIKey = "dc6zaTOxFJmzC";

// Initialize Variables
var queryURL = "";
var query = "";
var randomQuery = [];
var chuckAnswer = "";
var joke = "";
var title = "";

var database = firebase.database();

// AJAX Function
function sendToAjax() {
  event.preventDefault();
  query = $('#query').val().trim();
  queryURL = "https://api.chucknorris.io/jokes/search?query=" + query;
  backupQueryURL = "https://api.chucknorris.io/jokes/random";
  runAJAX();
  assignGifs();
}

// AJAX Call For Chuck Norris Facts
function runAJAX() {
$.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(response);
    if(response.result === null) {
      console.log("this is blank");
      $.ajax({
        url: backupQueryURL,
        method: "GET"
      })
      .done(function(response) {
        console.log(response);
        chuckAnswer = response.value;
        $('.answer-p').html(chuckAnswer);
      })
    } else {
      for (var i=0; i<response.result.length; i++){
        var responses = response.result[i].value;
        randomQuery.push(responses);
      }
      chuckAnswer = randomQuery[Math.floor(Math.random() * randomQuery.length)];
      console.log(chuckAnswer);
      $('.answer-p').html(chuckAnswer);
    }

    String.prototype.repeat = function(num){
      return new Array(num + 1).join(this);
    }

    var filter = ['cock', 'fuck', 'fucks', 'fucking', 'motherfucking', 'fucked-up'];

    $('.answer-p').text(function(i, txt){
      // iterate over all words
      for(var i=0; i<filter.length; i++){
        // Create a regular expression and make it global
        var pattern = new RegExp('\\b' + filter[i] + '\\b', 'g');
        // Create a new string filled with '*'
        var replacement = '*'.repeat(filter[i].length);
        txt = txt.replace(pattern, replacement);
      }

      // returning txt will set the new text value for the current element
      return txt;
    });
  });
}

// Giphy Function
function assignGifs() {
  giphyURL = "http://api.giphy.com/v1/gifs/search?q=norris+" + query + "&api_key=" + APIKey;
  $.ajax({
    url: giphyURL,
    method: "GET"
  }).done(function(giphyResponse) {
    var evenDiv = $(".giphy-even");
    var oddDiv = $(".giphy-odd");
    var giphyDrop = $('.giphy-drop');
    evenDiv.empty();
    oddDiv.empty();
    for(var i=0; i < 12; i++) {
      var gif = $("<img>");
      gif.addClass('gifs');
      gif.attr("src", giphyResponse.data[i].images.downsized.url);
      if (i % 2) {
        evenDiv.append(gif);
      } else {
        oddDiv.append(gif);
      }
    }
  })
}

// Collect Jokes for Firebase
title = $("#title").val().trim();
joke = $("#joke").val().trim();
database.ref().push({
  title: title,
  joke: joke
});

// Submit Jokes to Firebase
database.ref().on("child_added", function(snapshot) {
    console.log(snapshot);
  });
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
};
