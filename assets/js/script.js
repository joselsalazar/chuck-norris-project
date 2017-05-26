var queryURL = "";
var query = "";
var randomQuery = [];

$("#submit-query").click(function() {
  event.preventDefault();
  query = $('#query').val().trim();
  queryURL = "https://api.chucknorris.io/jokes/search?query=" + query;
  runAJAX();
})

function runAJAX() {
$.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    for (var i=0; i<response.result.length; i++){
      var responses = response.result[i].value;
      randomQuery.push(responses);
    }
    
    var chuckAnswer = randomQuery[Math.floor(Math.random() * randomQuery.length)];
    console.log(chuckAnswer);
    $('.answer-p').html(chuckAnswer);
  });
}