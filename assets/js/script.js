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
var allURL = "https://api.chucknorris.io/jokes/search?query=all";
var query = "";
var randomQuery = [];
var jokeStorage = [];
var selectJokes = [];
var chuckAnswer = "";
var joke = "";
var title = "";

// Empties Form
function emptyAll() {
  $('.chuck-jokes').find('input[type=text]').val("");
}

// SUBMIT PAGE ================== //
// Submit Jokes / Push to Firebase
function pushChuck() {
  database.ref("chuckJokes").push({
    joke: joke
  });
  var thanksText = $('.thanks');
  thanksText.html("<h1>Thanks for contributing!</h1>");
  $('.form-group').empty();
}

// Click Function 
$("#submit-jokes").click(function() {
  joke = $("#joke").val().trim();
  pushChuck();
});

// END SUBMIT PAGE ================ //

// Pull Jokes From Firebase

database.ref("chuckJokes").on("child_added", function(snapshot) {
    jokeStorage.push(snapshot.val().joke);
});


// Run Functions
function sendToAjax() {
  event.preventDefault();
  query = $('#query').val().trim();
  assignGifs();
  emptyAll();
  runSearch();
}

// Giphy Function
function assignGifs() {
  giphyURL = "https://api.giphy.com/v1/gifs/search?q=norris+" + query + "&api_key=" + APIKey + "&rating=pg";
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
  });
}

function runSearch() {
  selectJokes = jokeStorage.filter(function(word){
    return word.toLowerCase().includes(query.toLowerCase());
  });

  if (selectJokes.length > 0) {
    chuckAnswer = selectJokes[Math.floor(Math.random() * selectJokes.length)];
    $('.answer-p').html(chuckAnswer);
    
  } else {
    chuckAnswer = jokeStorage[Math.floor(Math.random() * jokeStorage.length)];
    $('.answer-p').html(chuckAnswer);
    console.log("random answer");
  }


// CENSORSHIP =========================================

  // Filter out curse words
  var filter = ['cock', 'fuck', 'fucks', 'fucking', 'motherfucker', 'motherfucking', 'fucked-up', 'bone', 'sex', 'boner','8=D', 'gynaecologist',
       'Kegel', 'virginity','spanking','ovulation', 'ejaculation','lesbian','sexual', 'porn','Jenner','cunts','penal','orgasms','Sex',
       'blowjob','wang','slept with','deflowered','boners','penis','Norrising','Dawkins'];

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
};
