var queryURL = "";
var query = "";
var randomQuery = [];
var chuckAnswer = "";

function sendToAjax() {
  event.preventDefault();
  query = $('#query').val().trim();
  queryURL = "https://api.chucknorris.io/jokes/search?query=" + query;
  backupQueryURL = "https://api.chucknorris.io/jokes/random";
  runAJAX();
}

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
        var chuckAnswer = response.value;
        $('.answer-p').html(chuckAnswer);
      })
    } else {
      for (var i=0; i<response.result.length; i++){
        var responses = response.result[i].value;
        randomQuery.push(responses);
      }
      var chuckAnswer = randomQuery[Math.floor(Math.random() * randomQuery.length)];
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

// To Do
